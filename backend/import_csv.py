import csv
from datetime import datetime
from pathlib import Path
from database import SessionLocal, engine, Base
from models import Expense as ExpenseModel

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

def parse_date(date_str):
    """Convert date string to Python date object"""
    date_str = date_str.strip()
    for fmt in ("%d/%m/%y", "%d/%m/%Y", "%m/%d/%y", "%m/%d/%Y", "%m/%d"):
        try:
            dt = datetime.strptime(date_str, fmt)
            if fmt == "%m/%d":
                dt = dt.replace(year=datetime.today().year)
            return dt.date()
        except ValueError:
            continue
    print(f"Warning: Could not parse date: {date_str}")
    return None

def parse_amount(amount_str):
    """Parse amount string, handle negative values and formatting"""
    if not amount_str or amount_str.strip() == "":
        return 0.0
    
    # Remove spaces (including non-breaking spaces \xa0), commas, and parentheses
    cleaned = amount_str.strip().replace("\xa0", "").replace(" ", "").replace(",", "")
    
    # Handle negative values in parentheses
    if cleaned.startswith("(") and cleaned.endswith(")"):
        cleaned = "-" + cleaned[1:-1]
    
    try:
        return float(cleaned)
    except:
        return 0.0

def import_expenses():
    db = SessionLocal()
    
    csv_file = Path(__file__).resolve().parent / "Mubende Costs Sept to Dec 2025.csv"
    
    imported_count = 0
    skipped_count = 0
    
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter=';')
        
        # Dynamically locate the header row so we stay resilient to manual edits in the CSV
        headers = None
        header_row_num = 0
        for idx, row in enumerate(reader, start=1):
            row_joined = ";".join(row).lower()
            if "date" in row_joined and "person responsible" in row_joined:
                headers = row
                header_row_num = idx
                break
        
        if not headers:
            print("❌ Could not find header row (missing 'Date'/'Person Responsible'). Aborting import.")
            return
        
        # Find business unit column indices from headers
        business_unit_cols = {}
        for idx, header in enumerate(headers):
            header_clean = header.strip() if header else ""
            if header_clean and header_clean not in ["Date", "Person Responsible", "Description", "Expense", ""]:
                business_unit_cols[idx] = header_clean
        
        print(f"Found business unit columns: {business_unit_cols}")
        
        # Now read data starting from the row after headers
        for row_num, row in enumerate(reader, start=header_row_num + 1):
            # Skip empty rows
            if len(row) < 4 or not row[0].strip():
                continue
            
            date_str = row[0].strip()
            person = row[1].strip() if len(row) > 1 else "N/A"
            description = row[2].strip() if len(row) > 2 else ""
            expense_amount = parse_amount(row[3]) if len(row) > 3 else 0.0
            
            # Parse date
            parsed_date = parse_date(date_str)
            if not parsed_date:
                print(f"Skipped row {row_num}: Could not parse date '{date_str}'")
                skipped_count += 1
                continue
            
            # Find which business unit has a value
            business_unit = "N/A"
            amount = abs(expense_amount)  # Use absolute value of expense
            
            for col_idx, centre_name in business_unit_cols.items():
                if len(row) > col_idx and row[col_idx].strip():
                    business_unit = centre_name
                    # Use the business unit amount if different from expense
                    centre_amount = parse_amount(row[col_idx])
                    if centre_amount != 0:
                        amount = abs(centre_amount)
                    break
            
            # Skip if no valid amount
            if amount == 0:
                continue
            
            # Create expense record
            expense = ExpenseModel(
                date=parsed_date,
                person=person,
                description=description,
                amount=amount,
                business_unit=business_unit,
                project=None  # Imported data has no project info
            )
            
            db.add(expense)
            imported_count += 1
            
            if imported_count % 10 == 0:
                print(f"Imported {imported_count} records...")
    
    db.commit()
    db.close()
    
    print(f"\n✅ Import complete!")
    print(f"   Imported: {imported_count} expenses")
    print(f"   Skipped: {skipped_count} rows")

if __name__ == "__main__":
    print("Starting CSV import...")
    print("=" * 50)
    import_expenses()
