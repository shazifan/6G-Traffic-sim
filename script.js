let completedSteps = [];
let currentStep = 0;

// 清除显示区域
function clearDisplay() {
    document.getElementById('display').innerHTML = '';
}

// 添加终端输出
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

// 更新进度条
function updateProgress(text, duration, callback, container) {
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-wrapper';

    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.innerText = text.replace('xx%', '0%');

    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);

    progressWrapper.appendChild(progressText);
    progressWrapper.appendChild(progressContainer);

    container.appendChild(progressWrapper);

    let progress = 0;
    const totalSteps = duration * 20;

    addTerminalOutput(text.replace('...xx%', ''));
    setTimeout(() => addTerminalOutput('加载中...'), 1000);

    function update() {
        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = progress + '%';
            progressText.innerText = text.replace('xx%', '100%');
            clearInterval(progressInterval);
            setTimeout(() => {
                addTerminalOutput(text.replace('...xx%', '').replace('正在加载', '') + '加载完成！');
                progressWrapper.remove(); // 重要：移除进度条
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

// 设置活动步骤
function setActiveStep(stepElement) {
    document.querySelectorAll('#steps-bar span').forEach(span => {
        span.classList.remove('active-step');
    });
    stepElement.classList.add('active-step');
}

// 检查前一步是否完成
function checkPreviousStepCompleted(step) {
    const previousStep = step - 1;
    if (previousStep > 0 && !completedSteps.includes(previousStep)) {
        alert(`请先完成上一步：第${previousStep}步！`);
        return false;
    }
    return true;
}

// 生成场景
function generateScene() {
    if (!checkPreviousStepCompleted(1)) return;
    
    setActiveStep(document.querySelector('#steps-bar span:nth-child(1)'));
    if (completedSteps.includes(1)) {
        displayScene();
    } else {
        clearDisplay(); // 重要：清除显示区域
        updateProgress('正在加载西安市主干路的城市级道路网络场景......xx%', 2, displayScene, document.getElementById('display'));
    }
}

// 显示场景
function displayScene() {
    const display = document.getElementById('display');
    display.innerHTML = `
        <div class="content-wrapper">
            <h2 class="content-title">西安市主干路的城市级道路网络场景</h2>
            <p class="content-description">这是西安市主干路的城市级路网图，包含 56 段双车道城市道路、34个道路节点以及56个边缘计算服务器。</p>
            <img src="images/scenario1.png" alt="步骤1 场景" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>`;
    if (!completedSteps.includes(1)) {
        completedSteps.push(1);
        updateButtonState(1);
    }
}

// 交通仿真
function trafficSimulation() {
    if (!checkPreviousStepCompleted(2)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(3)'));
    clearDisplay(); // 重要：清除显示区域
    
    if (completedSteps.includes(2)) {
        // 如果已完成，直接显示视频和图片
        displayTrafficSimulationVideo();
        displayTrafficSimulationImage();
    } else {
        updateProgress('正在加载车流仿真......xx%', 3, () => {
            displayTrafficSimulationVideo();
            updateProgress('正在加载路网结构......xx%', 2, displayTrafficSimulationImage, document.getElementById('display'));
        }, document.getElementById('display'));
    }
}

// 显示交通仿真视频
function displayTrafficSimulationVideo() {
    const display = document.getElementById('display');
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'content-wrapper';
    videoWrapper.innerHTML = `
        <h2 class="content-title">车流仿真</h2>
        <video controls autoplay style="max-width: 100%; max-height: 100%; object-fit: contain;">
            <source src="images/step2.mp4" type="video/mp4">
            您的浏览器不支持视频播放。
        </video>
    `;
    display.appendChild(videoWrapper);
}

// 显示交通仿真图片
function displayTrafficSimulationImage() {
    const display = document.getElementById('display');
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'content-wrapper';
    imageWrapper.innerHTML = `
        <h2 class="content-title">路网结构</h2>
        <p class="content-description">这是提取出的西安市主干路的城市级道路网络场景图的矩阵结构图。</p>
        <img src="images/step2.png" alt="步骤2" style="max-width: 100%; max-height: 100%; object-fit: contain;">
    `;
    display.appendChild(imageWrapper);
    if (!completedSteps.includes(2)) {
        completedSteps.push(2);
        updateButtonState(2);
    }
}

// 应用策略
function applyStrategy() {
    if (!checkPreviousStepCompleted(3)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(5)'));
    if (completedSteps.includes(3)) {
        displayStrategy();
    } else {
        clearDisplay(); // 重要：清除显示区域
        updateProgress('正在加载定向发布策略模型训练......xx%', 5, displayStrategy, document.getElementById('display'));
    }
}

// 显示策略
function displayStrategy() {
    const display = document.getElementById('display');
    display.innerHTML = `
        <div class="content-wrapper">
            <h2 class="content-title">定向发布策略模型训练</h2>
            <p class="content-description">考虑多类型服务共存下的通信资源调配，根据应急服务的到达分布，在常规服务占用的带宽资源中插入应急服务资源块，并利用深度强化学习进行通感算一体化车路协同定向发布模型训练和策略优化。</p>
            <video id="step3-video" controls autoplay>
                <source src="images/step3.mp4" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
        </div>
    `;
    if (!completedSteps.includes(3)) {
        completedSteps.push(3);
        updateButtonState(3);
    }
}

// 性能验证
function performanceVerification() {
    if (!checkPreviousStepCompleted(4)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(7)'));
    if (completedSteps.includes(4)) {
        showCompletedImages();
    } else {
        clearDisplay(); // 重要：清除显示区域
        displayPerformanceVerification();
    }
}

// 显示性能验证
function displayPerformanceVerification() {
    const display = document.getElementById('display');
    
    display.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    display.appendChild(gridContainer);

    const images = [
        { src: 'images/step4_fig1.jpg', title: '不同车辆数目下的通行时延' },
        { src: 'images/step4_fig2.jpg', title: '不同拥挤度下的通行时延' },
        { src: 'images/step4_fig3.jpg', title: '应急服务的传输损耗' },
        { src: 'images/step4_fig4.jpg', title: '常规服务的传输损耗' },
        { src: 'images/step4_fig5.jpg', title: '平均增益' },
        { src: 'images/step4_fig6.jpg', title: '应急服务等待数量' }
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

        const titleElement = document.createElement('h3');
        titleElement.className = 'content-title';
        titleElement.innerText = images[index].title;
        imageContainer.appendChild(titleElement);

        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressText.innerText = `${images[index].title}正在加载......0%`;
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

        addTerminalOutput(`正在加载${images[index].title}...`);

        function updateProgress() {
            if (progress >= 100) {
                progressText.style.display = 'none';
                progressContainer.style.display = 'none';
                const img = document.createElement('img');
                img.src = images[index].src;
                img.alt = images[index].title;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';
                imageContainer.appendChild(img);
                addTerminalOutput(`${images[index].title}加载完成`);
                loadNextImage(index + 1);
                return;
            }

            progress += 100 / totalSteps;
            if (progress > 100) progress = 100;
            progressBar.style.width = progress + '%';
            progressText.innerText = `${images[index].title}正在加载......${Math.floor(progress)}%`;
            setTimeout(updateProgress, 50);
        }

        updateProgress();
    }

    loadNextImage(0);
}

// 显示已完成的图片
function showCompletedImages() {
    const display = document.getElementById('display');
    display.innerHTML = '';
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    display.appendChild(gridContainer);

    const images = [
        { src: 'images/step4_fig1.jpg', title: '不同车辆数目下的通行时延' },
        { src: 'images/step4_fig2.jpg', title: '不同拥挤度下的通行时延' },
        { src: 'images/step4_fig3.jpg', title: '应急服务的传输损耗' },
        { src: 'images/step4_fig4.jpg', title: '常规服务的传输损耗' },
        { src: 'images/step4_fig5.jpg', title: '平均增益' },
        { src: 'images/step4_fig6.jpg', title: '应急服务等待数量' }
    ];

    images.forEach((img) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'grid-item';
        gridContainer.appendChild(imageContainer);

        const titleElement = document.createElement('h3');
        titleElement.className = 'content-title';
        titleElement.innerText = img.title;
        imageContainer.appendChild(titleElement);

        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.title;
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'contain';
        imageContainer.appendChild(imgElement);
    });
}

// 执行步骤
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

// 更新按钮状态
function updateButtonState(step) {
    const button = document.getElementById(`control-button-${step}`);
    const icon = button.querySelector('i');
    const span = button.querySelector('span');

    icon.className = 'fas fa-check';
    span.textContent = span.textContent.replace('开始', '查看') + ' (已完成)';
    button.disabled = false;
    button.classList.add('completed');
}

// 初始化按钮
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

    // 添加复位按钮事件监听
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', resetSimulation);
}

// 跳转到步骤
function jumpToStep(step) {
    if (completedSteps.includes(step)) {
        executeStep(step);
    } else {
        if (!checkPreviousStepCompleted(step)) return;
        alert(`请先点击按钮开始第${step}步！`);
    }
}

// 复位功能
function resetSimulation() {
    completedSteps = [];
    currentStep = 0;
    clearDisplay();
    document.querySelector('.terminal-content').innerHTML = '';
    
    // 重置按钮状态
    for (let i = 1; i <= 4; i++) {
        const button = document.getElementById(`control-button-${i}`);
        const icon = button.querySelector('i');
        const span = button.querySelector('span');

        icon.className = 'fas fa-play';
        span.textContent = span.textContent.replace('查看', '开始').replace(' (已完成)', '');
        button.disabled = false;
        button.classList.remove('completed');
    }

    // 重置步骤栏
    setActiveStep(document.querySelector('#steps-bar span:nth-child(1)'));

    addTerminalOutput('模拟已重置');
}

// 初始化页面
window.onload = function() {
    setActiveStep(document.querySelector('#steps-bar span:nth-child(1)'));
    initializeButtons();
};