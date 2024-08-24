let completedSteps = [];
let currentStep = 0;

function clearDisplay() {
    document.getElementById('display').innerHTML = '';
}

function addTerminalOutput(text) {
    const terminal = document.querySelector('.terminal-content');
    const now = new Date();
    const timestamp = now.toLocaleString('zh-CN', { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', 
        fractionalSecondDigits: 3, hour12: false 
    }).replace(/[\/]/g, '-');
    const outputLine = document.createElement('div');
    outputLine.innerHTML = `[${timestamp}] ${text}`;
    terminal.appendChild(outputLine);
    terminal.scrollTop = terminal.scrollHeight;
}

function updateProgress(text, duration, callback, container) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);

    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.innerText = text.replace('xx%', '0%');

    const progressWrapper = document.createElement('div');
    progressWrapper.style.display = 'flex';
    progressWrapper.style.flexDirection = 'column';
    progressWrapper.style.alignItems = 'center';
    progressWrapper.style.justifyContent = 'center';
    progressWrapper.style.height = '100%';

    progressWrapper.appendChild(progressContainer);
    progressWrapper.appendChild(progressText);

    container.innerHTML = '';
    container.appendChild(progressWrapper);

    let progress = 0;
    const totalSteps = duration * 20;

    addTerminalOutput(text.replace('······xx%', ''));
    setTimeout(() => addTerminalOutput('正在生成...'), 1000);

    function update() {
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = progress + '%';
            progressText.innerText = text.replace('xx%', '100%');
            clearInterval(progressInterval);
            setTimeout(() => {
                addTerminalOutput(text.replace('······xx%', '') + '已完成！');
                callback();
            }, 1000);
            return;
        }

        progress += 100 / totalSteps;
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        progressText.innerText = text.replace('xx%', Math.floor(progress) + '%');
    }

    const progressInterval = setInterval(update, 50);
}

function setActiveStep(stepElement) {
    document.querySelectorAll('#steps-bar span').forEach(span => {
        span.classList.remove('active-step');
    });
    stepElement.classList.add('active-step');
}

function checkPreviousStepCompleted(step) {
    const previousStep = step - 1;
    if (previousStep > 0 && !completedSteps.includes(previousStep)) {
        alert(`请先完成上一步：第${previousStep}步！`);
        return false;
    }
    return true;
}

function generateScene() {
    if (!checkPreviousStepCompleted(1)) return;
    
    setActiveStep(document.querySelector('#steps-bar span:nth-child(1)'));
    if (completedSteps.includes(1)) {
        displayScene();
    } else {
        updateProgress('场景图正在生成中······xx%', 2, displayScene, document.getElementById('display'));
    }
}

function displayScene() {
    const display = document.getElementById('display');
    display.innerHTML = `<img src="images/scenario1.png" alt="步骤1 场景" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
    if (!completedSteps.includes(1)) {
        completedSteps.push(1);
        updateButtonState(1);
    }
}

function trafficSimulation() {
    if (!checkPreviousStepCompleted(2)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(3)'));
    if (completedSteps.includes(2)) {
        displayTrafficSimulation();
    } else {
        updateProgress('仿真矩阵正在变换中······xx%', 3, displayTrafficSimulation, document.getElementById('display'));
    }
}

function displayTrafficSimulation() {
    const display = document.getElementById('display');
    display.innerHTML = `<img src="images/step2.png" alt="步骤2" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
    if (!completedSteps.includes(2)) {
        completedSteps.push(2);
        updateButtonState(2);
    }
}

function applyStrategy() {
    if (!checkPreviousStepCompleted(3)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(5)'));
    if (completedSteps.includes(3)) {
        displayStrategy();
    } else {
        updateProgress('策略应用中······xx%', 5, displayStrategy, document.getElementById('display'));
    }
}

function displayStrategy() {
    const display = document.getElementById('display');
    display.innerHTML = `
        <video controls autoplay style="max-width: 100%; max-height: 100%; object-fit: contain;">
            <source src="images/step3.mp4" type="video/mp4">
            您的浏览器不支持视频播放。
        </video>
    `;
    if (!completedSteps.includes(3)) {
        completedSteps.push(3);
        updateButtonState(3);
    }
}

function performanceVerification() {
    if (!checkPreviousStepCompleted(4)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(7)'));
    if (completedSteps.includes(4)) {
        showCompletedImages();
    } else {
        displayPerformanceVerification();
    }
}

function displayPerformanceVerification() {
    const display = document.getElementById('display');
    
    display.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    display.appendChild(gridContainer);

    const images = [
        'images/step4_fig1.jpg', 'images/step4_fig2.jpg',
        'images/step4_fig3.jpg', 'images/step4_fig4.jpg',
        'images/step4_fig5.jpg', 'images/step4_fig6.jpg'
    ];

    function loadNextImage(index) {
        if (index >= images.length) {
            completedSteps.push(4);
            updateButtonState(4);
            addTerminalOutput('性能验证完成！');
            return;
        }

        const imageContainer = document.createElement('div');
        imageContainer.className = 'grid-item';
        gridContainer.appendChild(imageContainer);

        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressText.innerText = `第${index + 1}张图正在加载······0%`;
        imageContainer.appendChild(progressText);

        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        imageContainer.appendChild(progressContainer);

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressContainer.appendChild(progressBar);

        const duration = Math.random() * 2 + 1;
        let progress = 0;
        const totalSteps = duration * 20;

        addTerminalOutput(`正在加载第${index + 1}张性能验证图...`);

        function updateProgress() {
            if (progress >= 100) {
                progressText.style.display = 'none';
                progressContainer.style.display = 'none';
                const img = document.createElement('img');
                img.src = images[index];
                img.alt = `步骤4 图${index + 1}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
                imageContainer.appendChild(img);
                addTerminalOutput(`第${index + 1}张图加载完成`);
                loadNextImage(index + 1);
                return;
            }

            progress += 100 / totalSteps;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            progressText.innerText = `第${index + 1}张图正在加载······${Math.floor(progress)}%`;
            setTimeout(updateProgress, 50);
        }

        updateProgress();
    }

    loadNextImage(0);
}

function showCompletedImages() {
    const display = document.getElementById('display');
    display.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    display.appendChild(gridContainer);

    const images = [
        'images/step4_fig1.jpg', 'images/step4_fig2.jpg',
        'images/step4_fig3.jpg', 'images/step4_fig4.jpg',
        'images/step4_fig5.jpg', 'images/step4_fig6.jpg'
    ];

    images.forEach((src, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'grid-item';
        gridContainer.appendChild(imageContainer);

        const img = document.createElement('img');
        img.src = src;
        img.alt = `步骤4 图${index + 1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        imageContainer.appendChild(img);
    });
}

function executeStep(step) {
    switch(step) {
        case 1:
            generateScene();
            break;
        case 2:
            trafficSimulation();
            break;
        case 3:
            applyStrategy();
            break;
        case 4:
            performanceVerification();
            break;
    }
}

function updateButtonState(step) {
    const button = document.getElementById(`control-button-${step}`);
    const icon = button.querySelector('i');
    const span = button.querySelector('span');

    icon.className = 'fas fa-check';
    span.textContent = span.textContent.replace('开始', '查看') + ' (已完成)';
    button.disabled = false;
}

function initializeButtons() {
    for (let i = 1; i <= 4; i++) {
        const button = document.getElementById(`control-button-${i}`);
        button.addEventListener('click', function() {
            if (!checkPreviousStepCompleted(i)) return;

            if (completedSteps.includes(i)) {
                executeStep(i);
            } else {
                currentStep = i;
                executeStep(i);
            }
        });
    }
}

function jumpToStep(step) {
    if (completedSteps.includes(step)) {
        executeStep(step);
    } else {
        if (!checkPreviousStepCompleted(step)) return;
        alert(`请先点击按钮开始第${step}步！`);
    }
}

// 初始化页面
window.onload = function() {
    setActiveStep(document.querySelector('#steps-bar span:nth-child(1)'));
    initializeButtons();
};