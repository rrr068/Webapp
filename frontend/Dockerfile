# Node.js の軽量な公式イメージをベースにする
FROM node:18-alpine

# 作業ディレクトリを指定
WORKDIR /app

# package.json と package-lock.json を先にコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# 残りのファイルをすべてコピー
COPY . .


# 開発サーバーを起動
CMD ["npm", "run", "dev"]
