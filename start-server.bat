@echo off
echo Starting local development server...
echo.
echo Your portfolio will be available at:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Try Python 3 first, then Python 2
python -m http.server 8000 2>nul
if errorlevel 1 (
    python -m SimpleHTTPServer 8000 2>nul
    if errorlevel 1 (
        echo Python is not installed or not in PATH
        echo Please install Python or use another web server
        pause
    )
)