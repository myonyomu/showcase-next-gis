# 2. ライブラリの設定

React・Next.jsが提供するのは宣言的UIの機能なので、基本的にスタイリングはまた別の提供形態を選択・適用する必要があります。  
ここには選択肢が無数にあるのですが、今回は必要なコンポーネントを自作しやすい環境を作っておきたかったので、tailwind + shadcn/uiを利用することにしました。

2024/2現在、スタイリングどうするよ問題についてはかなり混沌としているので、詳細は[詳しくまとめている人の記事](https://zenn.dev/chiji/articles/b0669fc3094ce3) をご確認ください。

「いっぱいあってわからん……」となる場合は、

- 細かく設定したい => 今回の方法
- もっとおおざっぱでいいから、とにかく準備されたコンポーネント使って切り貼りするように作りたい => [MUI](https://mui.com/)か[Chakra UI](https://chakra-ui.com/)

でいいと思います。

また、現状多く使われている・どういうものがある、という調査や傾向については、[State of CSS](https://stateofcss.com/ja-JP/)におおまかな傾向があったり、Zenn, Qiita等に詳しく[現状を纏めている人がいたりする](https://zenn.dev/t_keshi/scraps/2322ed9224457a)ので、そちらも参照してください。

この項目では以下の設定を行います。

- デザイン・UIに関わる設定(tailwind based)
- UIコンポーネントの設定

## Usage

設定のみの項目なので、設定に関わらない場合は読み飛ばしてもらって構いません。  
この設定で何ができるようになったのかを確認したい場合は、Setupの項目を飛ばし、Trialの項目まで進んで実行・確認してみてください。

## Setup

### Setup: UI Component(tailwind and tools)

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
今回のフォルダ構成は、コンポーネントごとにフォルダを切り、フォルダ内にテスト・Story全てを入れてしまうような構成を考えています。( 詳細は[この記事](https://zenn.dev/sum0/articles/9463d16d9d40e2) を参照)  
そのため、他のフォルダ構成を想定する場合は状況に合わせてカスタマイズしてください。

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

- storiesフォルダを削除
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

- Storybookがビルド時に参照するフォルダを変更するため、`.storybook/main.ts`を書き換える。

  ```ts
    // ...
    stories: [
      "../stories/**/*.mdx",
      "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    // ...
  ```

  ↓

  ```ts
      stories: [
    "../app/**/*.mdx",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  ```

## Trial

本項目では、Settingの欄で設定した内容が実際に動くか、どう機能するかのチュートリアルを行います。

1. コンポーネント用のフォルダを作成する。今回はフォルダ構成をあまり考えず、`app/_components/client/card`とします。
2. ターミナルから、shadcn/uiでcardコンポーネントを作成します。カレントディレクトリはプロジェクトルートを想定しています。

```sh
npx shadcn-ui add -y -p ./app/_components/client/card card
```

3. Storyを作成します。2024/2現在、[今後shadcn/uiでこの自動生成が実装されるかも？](https://github.com/shadcn-ui/ui/pull/11)という段階なので、もしかしたらこれ以降は必要ないかもしれません。
