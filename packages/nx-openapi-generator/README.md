# OpenAPI Plugin for Nx

[![NPM Version](https://badge.fury.io/js/%snakegio%2Fnx-plugin-openapi-generator.svg)](https://www.npmjs.com/@trumbitta/nx-plugin-openapi)
[![License](https://img.shields.io/npm/l/@trumbitta/nx-plugin-openapi-generator)]()

This repo is a porting of [`nx-trumbitta`](https://github.com/trumbitta/nx-trumbitta)
This nx plugin permit to auto-generate sources.

## 🧐 What is it?

It's a plugin for organizing OpenAPI spec files in libraries. You can then have other libraries for API SDKs ,all auto-generated from the spec files.

## 💡 How to install

```sh
npm install -D @snakegio/nx-plugin-openapi-generator
```

### Prerequisites

Sources get auto-generated via [`openapi-generator-cli`](https://github.com/OpenAPITools/openapi-generator-cli), so you'll need Java 8 or Docker installed.

## 🧰 Usage

## ✍️ Generators

This OpenAPI plugin for Nx should support any generator you can use with `openapi-generator-cli`.

Find the ones you need, together with all the additional properties available for each generator, here: https://openapi-generator.tech/docs/generators
