import os
import zipfile

def make_zip():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    zip_path = os.path.join(base_dir, "HIRESHIELD_HACKATHON_SUBMISSION.zip")
    
    exclude_dirs = {
        'node_modules', 
        '.git', 
        '__pycache__', 
        'venv', 
        '.venv', 
        'dist', 
        '.system_generated',
        '.vscode',
        '.idea'
    }
    
    exclude_files = {
        'HIRESHIELD_HACKATHON_SUBMISSION.zip',
        '.DS_Store',
        '.env',
        '.env.local',
        '.env.production',
        'hireshield.db',
        'hireshield.db-journal'
    }

    print(f"Creating clean submission archive: {zip_path}")
    count = 0
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(base_dir):
            # Modify dirs in-place to skip excluded directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
            
            for file in files:
                if file in exclude_files or file.endswith('.pyc') or file.endswith('.log'):
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, base_dir)
                
                # Double check no excluded folder slipped in
                parts = rel_path.split(os.sep)
                if any(p in exclude_dirs for p in parts):
                    continue
                
                zipf.write(full_path, os.path.join("HIRESHIELD_SUBMISSION", rel_path))
                count += 1

    size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Successfully packaged {count} files into '{zip_path}' ({size_mb:.2f} MB)")

if __name__ == "__main__":
    make_zip()
