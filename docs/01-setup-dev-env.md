# 1. 開発環境を作る
ランタイムの調整が面倒なので、VoltaとCorepackを使って整えます。  
Node.js 20.x, Volta 1.1.x以降なら問題なく動くと思います。  
パッケージマネージャとしてはnpmを利用します。yarnやpnpmを使いたい人は適宜読み替えてください。

なお、すでにローカルにNode.js、Yarn、pnpmなどがローカルインストールされている場合は、多分バージョンコントロールを別に用意していると思うので、そちらを利用して調整してください。  
この欄が何言ってるのかわかんないという人はNode.jsをアンインストールしておいてください。

また、開発用のエディタとしては、Visual Studio Codeを想定しています。

## Volta

### Usage
1. Install [Volta](https://volta.sh/)
2. Run `volta setup`

Windowsの場合は、設定->開発者用モードの有効化 が必要になります。

### Setup
最初に環境作る人や、環境を更新する人だけがやればいいです。
1. Run `volta pin node@<version>`

以下のような記述が`package.json`内にあればOKです。

```json
  "volta": {
    "node": "<major>.<minor>.<revision>"
  },
```

適切なバージョンがどれかイマイチつかめないなら、以下のバージョン指定で最新 or 安定版の最新が利用できるので、こちらを利用してください。

```sh
# 最新版。奇数バージョン or 最新のLTS。
# 奇数バージョンは実験機能も多いため、基本的に使うなら下記のLTSサポートを利用する。
volta pin node@latest

# 最新のLTS。偶数バージョン。リリースから約3年サポート。
volta pin node@lts
```

## Corepack
上記のvoltaの設定を行ったあとに実行してください。

### Usage
1. Run `corepack enable npm`
2. Run `corepack install`

### Setup
1. Package.jsonに以下の記述を追加してください。
```json
{
  // ...
  "packageManager": "npm@<major>.<minor>.<revison>"
}
```

基本的にVoltaに管理を委託してるので、Voltaの設定を行ったあとに`npm -v`で出たバージョンをそのまま突っ込めば問題ありません。
