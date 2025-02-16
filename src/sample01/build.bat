@echo off
setlocal
set command=..\..\node_modules\.bin\tsc -p .
call %command%
endlocal
