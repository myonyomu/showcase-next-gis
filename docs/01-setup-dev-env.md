# 1. 開発環境を作る
ランタイムの調整が面倒なので、Voltaを使って整えます。  
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
2. Run `volta pin npm@<version>`

以下のような記述が`package.json`内にあればOKです。

```json
  "volta": {
    "node": "<major>.<minor>.<revision>",
    "npm": "<major>.<minor>.<revision>"
  },
```

適切なバージョンがどれかイマイチつかめないなら、以下のバージョン指定で最新 or 安定版の最新が利用できるので、こちらを利用してください。

```sh
# 最新版。奇数バージョン or 最新のLTS。
# 奇数バージョンは実験機能も多いため、基本的に使うなら下記のLTSサポートを利用する。
volta pin node@latest

# 最新のLTS。偶数バージョン。リリースから約3年サポート。
volta pin node@lts

# パッケージマネージャも同様。yarn, pnpm等を利用したい場合は任意に書き換え
# ただし、npmにはlatestのタグしかなく、LTS版に合わせたパッケージは存在しない。
# 基本的にNode.jsの奇数・偶数メジャーバージョンを1セットとしてメジャーバージョン提供されるため、ほぼほぼ問題ないが、不安であればNode.js公式ページの互換性を見てpinするといい。
volta pin npm@latest
```

## VSCode
開発のためにいくつかの拡張機能を入れます。  
Ctrl + Shift + Pキーを押して、「recommended」で検索し、「拡張機能:お勧めの拡張機能を表示(Extension: Show Recommended Extensions)」を選択して、表示されたワークスペースの推奨拡張機能を全部入れてください。

### Devcontainer
Dev Containersで開発環境作る方が手っ取り早いので、使える人はそっち使ってください。  
詳細は.devcontainerフォルダ内を確認してください。上記手順を行った時と同様の状態になるように用意してあります。
