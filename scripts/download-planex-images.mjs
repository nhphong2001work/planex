import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("public/images/planex");
const images = [
  ["company-logo.png", "https://static.wixstatic.com/media/c7c83a_881ba3f596574b1d8edb2ea9a845ca52~mv2.png/v1/fill/w_40%2Ch_40%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/%E4%BC%9A%E7%A4%BE%E3%83%AD%E3%82%B4%20ICON_edited_edited_edited_edited_pn.png"],
  ["planex-logo.png", "https://static.wixstatic.com/media/c7c83a_3adc7976c77540a2868c8857ca2e23f3~mv2.png/v1/fill/w_317%2Ch_43%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/%E3%83%97%E3%83%A9%E3%83%8D%E3%83%83%E3%82%AF%E3%82%B9.png"],
  ["planex-giken-logo.png", "https://static.wixstatic.com/media/c7c83a_30ea58000af94e8f991d1ef2e570dac9~mv2.png/v1/fill/w_436%2Ch_64%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/c7c83a_30ea58000af94e8f991d1ef2e570dac9~mv2.png"],
  ["cad-cam.jpg", "https://static.wixstatic.com/media/c7c83a_84f7c0c7fd0749b3891617c789cf00c0~mv2.jpg/v1/crop/x_0%2Cy_0%2Cw_3382%2Ch_1901/fill/w_631%2Ch_353%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/c7c83a_84f7c0c7fd0749b3891617c789cf00c0~mv2.jpg"],
  ["molded-cover.jpg", "https://static.wixstatic.com/media/c7c83a_16dae189d4754f1e8c9219a3f82f2329~mv2.jpg/v1/fill/w_456%2Ch_301%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/cover%20_edited.jpg"],
  ["molded-impeller.jpg", "https://static.wixstatic.com/media/c7c83a_f2726ebe43194d6d9cecaacebef41cf7~mv2.jpg/v1/fill/w_456%2Ch_301%2Cal_c%2Cq_80%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%A9_edited.jpg"],
  ["molded-crank.jpg", "https://static.wixstatic.com/media/c7c83a_d82acf3761214b36ad5f8ecf200ef082~mv2.jpg/v1/fill/w_456%2Ch_301%2Cal_c%2Cq_80%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/%E3%82%AF%E3%83%A9%E3%83%B3%E3%82%972%E6%B2%BB%E6%88%90%E5%BD%A2%E5%93%81_edited.jpg"],
  ["molded-case.jpg", "https://static.wixstatic.com/media/c7c83a_370d30f7dcdb445cbf9bbd626db58c83~mv2.jpg/v1/fill/w_456%2Ch_301%2Cal_c%2Cq_80%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/%E3%82%B1%E3%83%BC%E3%82%B9_jpg%E3%81%AE%E8%A4%87%E8%A3%BD.jpg"],
  ["molded-black-component.jpg", "https://static.wixstatic.com/media/c7c83a_db131a4a1be7407c9193897020fe6ce8~mv2.jpg/v1/crop/x_0%2Cy_0%2Cw_1024%2Ch_679/fill/w_456%2Ch_301%2Cal_c%2Cq_80%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/c7c83a_db131a4a1be7407c9193897020fe6ce8~mv2.jpg"],
  ["molded-vibration-weld.jpg", "https://static.wixstatic.com/media/c7c83a_20d8b443cddd4e01a5cbc21b6e59a80c~mv2.jpg/v1/fill/w_456%2Ch_301%2Cal_c%2Cq_80%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/shindouyouchaku_edited.jpg"],
  ["vibration-welded.jpg", "https://static.wixstatic.com/media/c7c83a_9955a28a2d9d4fbfbaca2ad001fb3451~mv2.jpg/v1/crop/x_0%2Cy_0%2Cw_1023%2Ch_683/fill/w_775%2Ch_514%2Cal_c%2Cq_85%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/shindouyouchaku_edited_edited.jpg"],
  ["it-coding.jpg", "https://static.wixstatic.com/media/ec710b59c77d4b8f87c89c40d690cd18.jpg/v1/fill/w_980%2Ch_654%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/ec710b59c77d4b8f87c89c40d690cd18.jpg"],
  ["it-network.jpg", "https://static.wixstatic.com/media/11062b_00dfbdf43bf443eaae6e0156ee6caae8~mv2.jpg/v1/fill/w_980%2Ch_652%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/11062b_00dfbdf43bf443eaae6e0156ee6caae8~mv2.jpg"],
  ["it-machine.jpg", "https://static.wixstatic.com/media/c7c83a_b86a48e5c93c4a4b89580618af815600~mv2.jpg/v1/fill/w_679%2Ch_449%2Cal_c%2Cq_80%2Cusm_0.66_1.00%2Cenc_avif%2Cquality_auto/c7c83a_b86a48e5c93c4a4b89580618af815600~mv2.jpg"],
];

await mkdir(outputDirectory, { recursive: true });
const failures = [];

for (const [fileName, sourceUrl] of images) {
  try {
    let response = await fetch(sourceUrl);
    if (!response.ok) {
      const originalMediaUrl = `https://static.wixstatic.com/media/${sourceUrl.split("/media/")[1].split("/")[0]}`;
      response = await fetch(originalMediaUrl);
    }
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(resolve(outputDirectory, fileName), bytes);
    console.log(`${fileName}: ${bytes.length} bytes (${response.headers.get("content-type") ?? "unknown type"})`);
  } catch (error) {
    failures.push({ fileName, sourceUrl, error: String(error) });
    console.error(`${fileName}: ${String(error)}`);
  }
}

if (failures.length > 0) {
  await writeFile(
    resolve(outputDirectory, "download-failures.json"),
    `${JSON.stringify(failures, null, 2)}\n`,
  );
  process.exitCode = 1;
}
