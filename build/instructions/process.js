import { processInfo } from "../memory/data.js";
export class End {
    run(_) {
        processInfo.deallocate();
    }
}
