An analysis of recessionary indicators written in [Rust](https://rust-lang.org) & [TypeScript](https://typescriptlang.org)

### ⚠️ Prerequisite

`fred_key` must be set in `Config.toml`. You'll need to request an API Key in order to access FRED. This can be done at [https://fred.stlouisfed.org/docs/api/api_key](https://fred.stlouisfed.org/docs/api/api_key.html).

```toml
fred_key=abcdefghijklmnopqrstuvwxyz123456
```

## Getting Started

First, you need to download and install the [Rust compiler](https://rustup.rs/).

Then, once that's installed, you can compile the api.

```bash
cd api
cargo build --release or cargo run # for debug mode
```

## Usage

Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.
