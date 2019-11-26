#!/usr/bin/make
.PHONY: client api help
.DEFAULT_GOAL: help

default: help

help: ## Output available commands
	@echo "\nAvailable commands:\n"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'
	@echo "\n"

client: ## Work in client
	@code OAuth-Examples-Client -r

api: ## Work in API server
	@code OAuth-Examples-API -r