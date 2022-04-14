import fs from 'fs';

// afegiu codi ... (2pto)
export class ManagerFs {
    constructor(_file) {
        //...
        this.file=_file;
    }
    // setFile (_file){
    //     this.file=_file;
    // }

    getData() {
        const data = fs.readFileSync(this.file);
        return JSON.parse(data); 
    }
}



