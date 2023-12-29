# 2. ライブラリの設定

## Usage

## Setup

### Setup: UI Component

いくつか選択肢がありますが、今回は以下の視点から[shadcn/ui](https://ui.shadcn.com/)を採用しました。

- Next.js 14以降から採用されているApp Router及びReact Server Componentsと相性がいいHeadless UI Component
- tailwindと相性が良さそう
- [React18から導入されたSuspense]の挙動も含めてコントロールしてみたいので、コンポーネントの中身を直接触っておきたい
- Storybookの導入において一覧性を確保しやすそう

これを作成している2023/12現在、Next.js 14 + React 18の混乱期にあるので、より洗練されたUI Componentが出る可能性が高いです。  
[MUIがApp Router統合への対応を始めたようなので](https://qiita.com/KokiSakano/items/2cd9b1488c4f508633fb)、より安定・デファクトスタンダードに近づけたいなら、MUIもアリだと思います。

1. Run `npx shadcn-ui@latest init`

今回は以下のように設定しています。

```sh
Would you like to use TypeScript (recommended)? ... no / yes #yes
Which style would you like to use? » New York
Which color would you like to use as base color? » Gray # 好きなものを選んでください。気に入るカラーがなければ https://zenn.dev/hayato94087/articles/b2a465f857174a を参照
Where is your global CSS file? ... app/globals.css
Would you like to use CSS variables for colors? ... no / yes #yes
Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ... # blank
Where is your tailwind.config.js located? ... tailwind.config.ts
Configure the import alias for components: ... @/_components
Configure the import alias for utils: ... @/_lib/utils
Are you using React Server Components? ... no / yes #yes
Write configuration to components.json. Proceed? ... yes
```

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
