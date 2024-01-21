import { Readable } from "node:stream"

class OneToHundredStream extends Readable {
    index = 1

    // método do Readable
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                // push é um método do Readable para inserir as informaç~eos que estão sendo lidas
                this.push(null)
            } else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 500)
    }
}

fetch("http://localhost:3334", {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(res => {
    res.text().then(data => {
        console.log("data ", data);
    })
})