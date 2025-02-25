@echo off
setlocal
set REMOVE=rmdir /s /q .\build\
call %REMOVE%
set command=..\..\node_modules\.bin\tsc -p .
call %command%
endlocal
