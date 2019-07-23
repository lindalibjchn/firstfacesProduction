#!/usr/bin/env python3 
import ast

f = open("map.json","r")
out = ""
for line in f:
	out+=line.strip()+" "
print(ast.literal_eval(out)['fragments'])