export PATH=$NODEJS_12_16_1_BIN:$YARN_1_22_4_BIN:$PATH

echo "node: $(node -v)"
echo "npm: v$(npm -v)"

NODE_ENV=development npm install

npm run build
