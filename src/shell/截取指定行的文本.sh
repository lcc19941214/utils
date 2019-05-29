#!/bin/bash

raedme='../../README.md'

# tail

## 显示最后10行
cat $raedme | tail -n 10

## 显示第10行以后的所有内容
cat $raedme | tail -n +10

## 显示第1行到第10行
cat $raedme | head -n 10

## 显示第10到第20行
cat $raedme | head -n 20 | tail -n +10

## 从第10行开始显示，显示20行
cat $readme | tail -n +10 | head -n 20