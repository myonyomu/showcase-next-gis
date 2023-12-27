# 1. 開発環境を作る
ランタイムの調整が面倒なので、Voltaを使って整えます。  
Node.js 20.x, Volta 1.1.x以降なら問題なく動くと思います。  
パッケージマネージャとしてはnpmを利用します。yarnやpnpmを使いたい人は適宜読み替えてください。

なお、すでにローカルにNode.js、Yarn、pnpmなどがローカルインストールされている場合は、多分バージョンコントロールを別に用意していると思うので、そちらを利用して調整してください。  
この欄が何言ってるのかわかんないという人はNode.jsをアンインストールしておいてください。

また、開発用のエディタとしては、Visual Studio Codeを想定しています。

## Usage
### Volta
1. Install [Volta](https://volta.sh/)
2. Run `volta setup`

Windowsの場合は、設定->開発者用モードの有効化 が必要になります。

### VSCode or Dev containers
開発のためにいくつかの拡張機能を入れます。  
Ctrl + Shift + Pキーを押して、「recommended」で検索し、「拡張機能:お勧めの拡張機能を表示(Extension: Show Recommended Extensions)」を選択して、表示されたワークスペースの推奨拡張機能を全部入れてください。

Dev Containersで開発環境作る方が手っ取り早いので、使える人はそっち使ってください。  
詳細は.devcontainerフォルダ内を確認してください。上記手順を行った時と同様の状態になるように用意してあります。

### Install libs
voltaの設定が完了したら、カレントディレクトリをプロジェクトルートに移動し、`npm i`を実行してください。

## Setup
以下は最初に環境作る人や、環境を更新する人だけがやればいいです。  
開発メンバーが全員できるならそれに越したことはありませんが、最悪一人だけできれば大丈夫です。

上記のVoltaはインストール済であるとして、実行手順は以下になります。

### Setup:Volta

1. Run `volta pin node@<version>`
2. Run `volta pin npm@<version>`

利用したいランタイムのバージョン更新等があれば、pinするバージョンを変更して確認およびビルド・デプロイを行ってください。

以下のような記述が`package.json`内にあればOKです。

```json
  "volta": {
    "node": "<major>.<minor>.<revision>",
    "npm": "<major>.<minor>.<revision>"
  },
```

適切なバージョンがどれかイマイチつかめないなら、以下のバージョン指定で最新 or 安定版の最新が利用できるので、これらを利用してください。

```sh
# 最新版。奇数バージョン or 最新のLTS。
# 奇数バージョンは実験機能も多いため、基本的に使うなら下記のLTSサポートを利用する。
volta pin node@latest

# 最新のLTS。偶数バージョン。リリースから約3年サポート。
volta pin node@lts

# パッケージマネージャも同様。yarn, pnpm等を利用したい場合は任意に書き換え
# ただし、npmにはlatestのタグしかなく、LTS版に合わせたパッケージは存在しない。
# 基本的にNode.jsの奇数・偶数メジャーバージョンを1セットとしてメジャーバージョン提供されるため、ほぼほぼ問題ないが、不安であればNode.js公式ページの互換性を見てpinするといい。
# 公式のリリースサイクルは https://nodejs.org/en/about/previous-releases を参照。
volta pin npm@latest
```

ホストしたいサービスによって制限があるならば、そのバージョンに合わせてください。

例えば[Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js#default-and-available-versions)なら2023/12時点で20.x, 18.x, 16.xをサポートし、20.xはベータ版、16.xは2024/6に廃止予定です。よって、18 or 20が選択肢になるでしょう。

### Setup:Next.js
`create-next-app`でNext.jsの基盤を作ってしまいます。

```sh
npx create-next-app@latest <application name>
```

本リポジトリでの生成テンプレート、および、create-next-appのバージョンは以下となっています。

```sh
create-next-app@14.0.4
Ok to proceed? (y) y
✔ Would you like to use TypeScript? … No / Yes #Yes
✔ Would you like to use ESLint? … No / Yes #Yes
✔ Would you like to use Tailwind CSS? … No / Yes #Yes
✔ Would you like to use `src/` directory? … No / Yes #No
✔ Would you like to use App Router? (recommended) … No / Yes #Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes #No
```

生成完了後、`npm run dev`を実行し、localhost:3000でアプリケーションの待ち受けが始まれば成功です。

### Setup:Linter and Formatter
Eslint + Prettierで構成しています。

1. Run `npm i -D @typescript-eslint/eslint-plugin eslint-config-prettier prettier`
2. `.eslintrc.json`に以下のように追記
```json
{
  "extends": [
    "next/core-web-vitals",
  ]
}
```
↓
```json
{
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier"
  ]
}
```
3. `package.json`に以下のように追記
```json
  // ...
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  // ...
```
↓
```json
  // ...
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write --ignore-path .gitignore './**/*.{js,jsx,ts,tsx,json,css}' && next lint --fix"
  },
  // ...
```
4. prettierの設定ファイルを作成し、プロジェクトルートに設置。本プロジェクト絵は`.prettier.json`として置いています。  
作ってある設定内容はかなり好みに寄っているので、各プロジェクトで良きように調整してください。
```json
{
  "tabWidth": 2,
  "printWidth": 120,
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": true
}
```

設定完了後、`npm run format`を実行してlint, formatが通るか確認します。

### Setup: Husky and lint-staged

1. Run `npm i -D husky lint-staged`
2. Run `npx husky-init`
3. Run `npx husky install`
4. Run `npx husky add .husky/pre-commit "npx lint-staged"`
5. プロジェクトのルートディレクトリに`.lintstagedrc.js`を追加します。内容については[実際のファイルを参照](../.lintstagedrc.js)
6. GUIを使っている人はユーザーホームディレクトリに`.huskyrc`を追加し、以下を記述します。理由は[リンク先の記事](https://zenn.dev/cureapp/articles/f2722061739b51)および[公式トラブルシューティング](https://typicode.github.io/husky/troubleshooting.html#command-not-found)を参照。
```sh
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

### Setup: Vitest
テストにVitestを利用します。Jestを利用したい場合は適宜読み替えてください。

1. Run `npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react`
2. [Next.js公式の設定方法]に合わせて設定ファイルを構築する

vitest.config.ts
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

3. `package.json`内のテストスクリプトを編集する
  ```json
  "scripts": {
    // ...
    "test": "vitest --passWithNoTests",
    // ...
  },
  ```
`--passWithNoTests`は初期コミット用にテストファイルが無くてもOKとする設定なので、何らかのテストファイルを書いているならば外してしまってOKです。（というか、テスト完全無視や完全削除、パス指定のミスを見逃さないためにも、一個でもテストを書いたら削除推奨）

### Setup: Path alias(Optional)
componentのimportが相対パスだけだとしんどいので、先にpath aliasを設定してしまいます。  
`tsconfig.json`の`paths`の項目を以下のようにします。

```json
    "paths": {
      "@/*": ["./app/*"],
      "@@/*": ["./*"]
    }
```

詳細は[公式の利用方法とサンプル](https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/module-path-aliases)を確認してください。

### Setup: Storybook(Optional)
Storybookを利用してUI管理を行う場合、その初期設定を行います。

1. Run `npx storybook@latest init`
2. Storybook用のフォルダやファイルがスキャフォールディングされるが、2023/12（Ver 7.6.6）時点では特に必要のないonboarding addonも一緒に入ってしまうので削除する。(初めて触るならチュートリアルも一緒に動いてくれるので、試しに触ってから消すのもアリ)
   - `npm uninstall -D @storybook/addon-onboarding`
   - `.storybook/main.ts`からアドオン削除
  ```ts
  // ...
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  // ...
  ```
  ↓
  ```ts
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  ```
  - スキャフォールディングで作成されたstoriesフォルダ内のファイルをすべて削除
  - 上記のPathsエイリアスの設定を利用するように`.storybook/main.ts`を書き換える。書き換え方は[Storybook公式のトラブルシューティング](https://storybook.js.org/docs/builders/webpack#typescript-modules-are-not-resolved-within-storybook)を参照。
  ```ts
  // ...
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../app"),
        "@@": path.resolve(__dirname, "../")
      };
    }
    return config;
  },
  // ...
  ```
