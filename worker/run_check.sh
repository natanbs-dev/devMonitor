#!/bin/bash
cd /home/bonham-b/code-projects/v2/devMonitor/worker
source venv/bin/activate
python3 monitor.py
cp devmonitor.db ../api/devmonitor.db
