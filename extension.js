const vscode = require('vscode');

let myStatusBarItem;

function activate(context) {
    // 1. Registro del comando para abrir el Webview Premium
    let disposable = vscode.commands.registerCommand('26counter.helloWorld', function () {
        const panel = vscode.window.createWebviewPanel(
            'mundialCountdown',
            'Mundial 2026 Countdown',
            vscode.ViewColumn.One,
            { 
                enableScripts: true,
                retainContextWhenHidden: true 
            }
        );

        panel.webview.html = getAestheticHTML();
    });
    context.subscriptions.push(disposable);

    // 2. Creación del Item en la Barra de Estado
    // Alignment.Left con prioridad 1000 para que esté siempre visible al inicio
    myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
    myStatusBarItem.command = '26counter.helloWorld';
    
    myStatusBarItem.color = '#c5ff00'; 
    
    // TRUCO: Fondo destacado (Usualmente amarillo/naranja según el tema de VS Code)
    myStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    
    myStatusBarItem.tooltip = "Click para abrir tablero de control Mundial 2026";
    context.subscriptions.push(myStatusBarItem);

    // Actualización del contador cada segundo
    setInterval(() => {
        updateStatusBarItem();
    }, 1000);

    updateStatusBarItem();
    myStatusBarItem.show();
}

function updateStatusBarItem() {
    const targetDate = new Date("June 11, 2026 00:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

        // Formato solicitado: Trofeo + Contador
        myStatusBarItem.text = `🏆 ${d}d ${h}:${m}:${s}`;
    } else {
        myStatusBarItem.text = `🏆 ¡EMPEZÓ EL MUNDIAL!`;
    }
}

function getAestheticHTML() {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --globant-green: #c5ff00;
            --colombia-yellow: #FFCD00;
            --colombia-blue: #0044cc;
            --colombia-red: #ff1a1a;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background-color: #050505;
            color: white;
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }
        #mouse-glow {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            pointer-events: none;
            background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                        rgba(197, 255, 0, 0.15) 0%, 
                        transparent 60%);
            z-index: 1;
        }
        h1 {
            font-size: 2.5rem;
            color: var(--globant-green);
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 40px;
            z-index: 2;
            text-align: center;
        }
        #countdown { display: flex; gap: 15px; z-index: 2; }
        .time-section {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(12px);
            padding: 30px;
            border-radius: 18px;
            text-align: center;
            border: 1px solid rgba(197, 255, 0, 0.3);
        }
        .number { display: block; font-size: 3.5rem; font-weight: 700; }
        .col-y { color: var(--colombia-yellow); }
        .col-b { color: var(--colombia-blue); }
        .col-r { color: var(--colombia-red); }
        .label { font-size: 0.8rem; text-transform: uppercase; opacity: 0.6; }
    </style>
</head>
<body>
    <div id="mouse-glow"></div>
    <h1>Cuanto falta para el mundial</h1>
    <div id="countdown">
        <div class="time-section"><span class="number col-y" id="days">000</span><span class="label">Días</span></div>
        <div class="time-section"><span class="number col-b" id="hours">00</span><span class="label">Horas</span></div>
        <div class="time-section"><span class="number col-b" id="minutes">00</span><span class="label">Minutos</span></div>
        <div class="time-section"><span class="number col-r" id="seconds">00</span><span class="label">Segundos</span></div>
    </div>
    <script>
        const glow = document.getElementById('mouse-glow');
        window.addEventListener('mousemove', e => {
            glow.style.setProperty('--x', e.clientX + 'px');
            glow.style.setProperty('--y', e.clientY + 'px');
        });
        const targetDate = new Date("June 11, 2026 00:00:00").getTime();
        function updateTimer() {
            const now = new Date().getTime();
            const diff = targetDate - now;
            if (diff <= 0) return;
            document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
        setInterval(updateTimer, 1000);
        updateTimer();
    </script>
</body>
</html>
    `;
}

function deactivate() {}
module.exports = { activate, deactivate };