import { JsonRpcProvider } from "ethers";

const provider = new JsonRpcProvider(
  "https://coston2-api.flare.network/ext/bc/C/rpc"
);

(async () => {
  const code = await provider.getCode(
    "0x4aC6E3F4c83805fa07953B31db844a547d11707c"
  );
  console.log("bytecode prefix:", code.slice(0, 10));
})();

setInterval(() => {
  console.log("Hello");
}, 1000);
