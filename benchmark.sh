#!/bin/bash

gplc knightGPLC.pl -o o

echo -e "#### Runing on SWI-Prolog engine ###"
time ./benchmarkHelp.sh prolog knight.pl

echo -e "\n\n#### Runing on GPLC compiled C engine ####"
time ./benchmarkHelp.sh ./o

