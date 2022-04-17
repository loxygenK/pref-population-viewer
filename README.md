# pref-population-viewer

都道府県ごとの人口構成の推移をグラフで表示するアプリケーション．

## 環境

### パッケージマネージャについて
パッケージマネージャに [pnpm](https://pnpm.io/ja/) を使っています．

### コミットメッセージの形式について
コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/ja) を使っています．

### 開発の準備
```bash
git clone https://github.com/loxygenK/pref-population-viewer
cd pref-population-viewer
pnpm i
```

### Scripts
この表に書かれているもの以外のスクリプトは，[`package.json`](https://github.com/loxygenK/pref-population-viewer/tree/main/package.json) に記述されています．

| Scripts       | 内容                                         |
| :------------ | :------------------------------------------- |
| `dev`         | 開発用サーバを起動する．                     |
| `start`       | プロダクションモードでサーバを起動する．     |
| `build`       | プロダクションビルドを作成する.              |
| `test`        | Jest を実行する．                            |
| `test:update` | スナップショットを更新する．                 |
| `lint`        | ESLint + Prettier の lint を実行する．       |
| `fix`         | `pnpm lint` で出た修正可能な問題を修正する． |

### フック
#### `pnpm i` 後など (`prepare`)
- `husky init` ... コミットフックが設定されます．

#### checkout 後
- `pnpm i` ... ブランチ内の `package.json` と `pnpm-lock.yaml` に基づいてパッケージをインストールします．

#### コミット前
- `lint-staged` ... ステージされた変更に対して `pnpm fix` (と同等の処理) を実行します．ファイルの内容が変わるかもしれません．

### 開発の流れ
1. `git checkout main` (必要に応じて)
2. `git pull origin main` (必要に応じて)
3. `git checkout -b <ブランチ名>`
4. (必要な変更をする)
5. `git commit -m "..."`
   - このときにコミットフックが実行され，ファイルが変更される可能性があります．
6. `git push origin <ブランチ名>`
7. Pull requests を作成する
8. CI が全て通過するのを待ち，Squash merge
   - base ブランチは自動的に削除されます．
