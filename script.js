var cap1=''
var cap2=''
document.addEventListener("DOMContentLoaded", () => {
            const connectButton = document.getElementById("connectButton");
            const sendButton = document.getElementById("sendButton");
            const input = document.getElementById("input");
            const output = document.getElementById("output");
            let port;

            connectButton.addEventListener("click", async () => {
                try {
                    port = await navigator.serial.requestPort();
                    await port.open({ baudRate: 115200 }); // Adjust baudRate as needed
                    output.value = "-Connected to the serial device.\n";
                } catch (error) {
                    console.error("-Serial connection error:", error);
                  output.value = ("-Serial connection error:", error)
                }
            });

            sendButton.addEventListener("click", async () => {
                if (!port) {
                    output.value += "-Not connected to the serial device.\n";
                    return;
                }

                const writer = port.writable.getWriter();
                const message = input.value;

                try {
                    await writer.write(new TextEncoder().encode(message));
                    output.value += "-Sent to serial device: " + message + "\n";
                    input.value = "";
                } catch (error) {
                    console.error("-Error writing to the serial device:", error);
                } finally {
                    writer.releaseLock();
                }
            });
        });

