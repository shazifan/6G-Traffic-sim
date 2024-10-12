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
        updateProgress('正在加载西安市主干路的城市级道路网络场景......xx%', 2, () => {
            displayScene();
            updateProgress('正在加载路网结构......xx%', 2, displayTrafficSimulationImage, document.getElementById('display'));
        }, document.getElementById('display'));    
    }
}

// 显示场景
function displayScene() {
    const display = document.getElementById('display');
    display.innerHTML = `
        <div class="content-wrapper">
            <h2 class="content-title">西安市主干路的城市级道路网络场景</h2>
            <p class="content-description">以下是西安市城区道路地图，通过抽取其中的主干道路，得到城市级路网结构。
            路网包含56段双车道城市道路以及34个道路节点，每条路段设置有1个边缘计算服务器。</p>
            <img src="images/scenario1.png" alt="步骤1 场景" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>`;
    if (!completedSteps.includes(1)) {
        completedSteps.push(1);  // 标记第一步完成
        updateButtonState(1);
    }
}

// 显示交通仿真图片（移到第一步显示）
function displayTrafficSimulationImage() {
    const display = document.getElementById('display');
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'content-wrapper';
    imageWrapper.innerHTML = `
        <h2 class="content-title">路网结构</h2>
        <p class="content-description">这是提取出的西安市主干路的城市级道路网络场景图的矩阵结构图。</p>
        <img src="images/step2.png" alt="步骤1 路网结构" style="max-width: 100%; max-height: 100%; object-fit: contain;">
    `;
    display.appendChild(imageWrapper);
}

// 交通仿真
function trafficSimulation() {
    if (!checkPreviousStepCompleted(2)) return;

    setActiveStep(document.querySelector('#steps-bar span:nth-child(3)'));
    clearDisplay(); // 重要：清除显示区域
    
    if (completedSteps.includes(2)) {
        // 如果已完成，直接显示视频
        displayTrafficSimulationVideo();
    } else {
        updateProgress('正在加载车流仿真......xx%', 3, displayTrafficSimulationVideo, document.getElementById('display'));
    }
}

// 显示交通仿真视频（第二步）
function displayTrafficSimulationVideo() {
    const display = document.getElementById('display');
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'content-wrapper';
    videoWrapper.innerHTML = `
        <h2 class="content-title">车流仿真</h2>
        <video autoplay loop muted style="max-width: 100%; max-height: 100%; object-fit: contain;" oncontextmenu="return false;">
            <source src="images/step2.mp4" type="video/mp4">
            您的浏览器不支持视频播放。
        </video>
    `;
    display.appendChild(videoWrapper);
    if (!completedSteps.includes(2)) {
        completedSteps.push(2);  // 标记第二步完成
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
            <video id="step3-video" autoplay loop muted style="max-width: 100%; max-height: 100%; object-fit: contain;" oncontextmenu="return false;">
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

    // 系统基础参数配置表格（保留）
    const parameterTable = `
        <div class="content-wrapper">
            <h2 class="content-title">系统基础参数配置</h2>
            <table style="width:100%; border-collapse: collapse; text-align: center;">
                <thead style="background-color: #48C774; color: white;">
                    <tr>
                        <th style="padding: 8px; border-right: 1px solid #fff;">总信道带宽</th>
                        <th style="padding: 8px; border-right: 1px solid #fff;">资源块大小</th>
                        <th style="padding: 8px; border-right: 1px solid #fff;">子载波间隔</th>
                        <th style="padding: 8px; border-right: 1px solid #fff;">噪声功率</th>
                        <th style="padding: 8px; border-right: 1px solid #fff;">最大传输功率</th>
                        <th style="padding: 8px; border-right: 1px solid #fff;">PPO截取率</th>
                        <th style="padding: 8px;">训练迭代数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ccc;">20 MHz</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">180 KHz</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">15 KHz</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">-100 dBm</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">40 dBm</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">0.2</td>
                        <td style="padding: 8px; border: 1px solid #ccc;">1500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // 插入表格到显示区域
    display.innerHTML = parameterTable;

    // 创建组合条件选择框
    const conditionWrapper = `
        <div class="content-wrapper">
            <h2 class="content-title">不同配置性能测试</h2>
            <div class="condition-selector">
                <label>车流量：</label>
                <select id="trafficFlow">
                    <option value="2500">2500辆/小时</option>
                    <option value="3000">3000辆/小时</option>
                </select>

                <label>数据请求速率：</label>
                <select id="dataRate">
                    <option value="10">10 Mbps</option>
                    <option value="20">20 Mbps</option>
                    <option value="30">30 Mbps</option>
                </select>

                <button id="executeButton" style="margin-left: 20px;">执行</button>
            </div>
            <div id="imageContainer" style="margin-top: 20px; text-align: center;"></div>  <!-- 将图片居中显示 -->
        </div>
    `;

    // 将选择框插入显示区域
    display.innerHTML += conditionWrapper;

    // 绑定执行按钮事件
    document.getElementById('executeButton').addEventListener('click', () => {
        const trafficFlow = document.getElementById('trafficFlow').value;
        const dataRate = document.getElementById('dataRate').value;

        // 计算图片索引，根据车流量和数据请求速率的组合
        let imageIndex = getImageIndex(trafficFlow, dataRate);

        // 加载并显示对应的图片
        displayImage(imageIndex);
    });
}

// 通过车流量和数据请求速率的组合计算图片索引
function getImageIndex(trafficFlow, dataRate) {
    if (trafficFlow === '2500') {
        if (dataRate === '10') return 0;  // 2500辆/小时下无10Mbps图，留空
        if (dataRate === '20') return 1;  // fig1
        if (dataRate === '30') return 2;  // fig2
    } else if (trafficFlow === '3000') {
        if (dataRate === '10') return 3;  // fig4
        if (dataRate === '20') return 4;  // fig5
        if (dataRate === '30') return 5;  // fig6
    }
}

// 根据索引显示对应的图片，带进度条
function displayImage(imageIndex) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // 清空之前的图片

    const images = [
        { src: 'images/step4_fig1.jpg' },
        { src: 'images/step4_fig2.jpg' },
        { src: 'images/step4_fig3.jpg' },
        { src: 'images/step4_fig4.jpg' },
        { src: 'images/step4_fig5.jpg' },
        { src: 'images/step4_fig6.jpg' }
    ];

    // 设置图片的大小为60%，居中
    const imgElement = document.createElement('img');
    imgElement.src = images[imageIndex].src;
    imgElement.style.width = '60%';  // 图片大小缩小为原来的60%
    imgElement.style.height = 'auto';  // 保持图片比例
    imgElement.style.margin = '0 auto';  // 居中
    imgElement.style.display = 'block';  // 确保图片为块级元素

    // 创建进度条容器，宽度固定为屏幕宽度的25%
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-wrapper';
    progressWrapper.style.width = '150%'; // 固定宽度为屏幕的25%
    progressWrapper.style.margin = '0 auto'; // 居中

    const progressText = document.createElement('div');
    progressText.className = 'progress-text';
    progressText.innerText = '正在加载...'; // 改为“正在加载...”
    progressText.style.whiteSpace = 'nowrap';  // 确保文字不换行
    progressText.style.textAlign = 'center';   // 居中对齐

    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';  // 初始宽度为0

    progressContainer.appendChild(progressBar);
    progressWrapper.appendChild(progressText);
    progressWrapper.appendChild(progressContainer);
    imageContainer.appendChild(progressWrapper);

    // 模拟进度条加载过程
    let progress = 0;
    const totalSteps = 20;  // 总步数
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            // 移除进度条并显示图片
            progressWrapper.remove();
            imageContainer.appendChild(imgElement); // 加载完成后显示图片
        } else {
            progress += 100 / totalSteps;
            progressBar.style.width = `${progress}%`;
        }
    }, 100);  // 每100ms更新一次
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