import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export class InputSystem {
  constructor(camera, domElement, fireworkSystem = null) {
    this.controls = new PointerLockControls(camera, domElement);
    this.fireworkSystem = fireworkSystem;
    this.isTouchDevice = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
    this.touchButtons = new Map();
    
    // Movement state
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false
    };
    this.status = {
      moving: false,
      direction: 'idle',
      looking: false
    };
    
    // Click to lock cursor
    domElement.addEventListener('click', () => {
      if (!this.controls.isLocked) {
        this.controls.lock();
      }
    });

    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement === domElement) {
        this.instructions.style.display = 'none';
        this.updateStatusOverlay();
      } else {
        this.instructions.style.display = this.isTouchDevice ? 'block' : '';
      }
    });

    document.addEventListener('mousemove', (event) => this.onMouseMove(event));
    document.addEventListener('keydown', (event) => this.onKeyDown(event));
    document.addEventListener('keyup', (event) => this.onKeyUp(event));
    
    // Instruction overlay
    this.setupInstructions();
  }
  
  setupInstructions() {
    // Crosshair dot
    const crosshair = document.createElement('div');
    crosshair.style.position = 'absolute';
    crosshair.style.top = '50%';
    crosshair.style.left = '50%';
    crosshair.style.width = '4px';
    crosshair.style.height = '4px';
    crosshair.style.marginLeft = '-2px';
    crosshair.style.marginTop = '-2px';
    crosshair.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    crosshair.style.borderRadius = '50%';
    crosshair.style.pointerEvents = 'none';
    crosshair.style.zIndex = '100';
    document.body.appendChild(crosshair);

    this.instructions = document.createElement('div');
    this.instructions.style.position = 'absolute';
    this.instructions.style.left = '50%';
    this.instructions.style.transform = 'translate(-50%, -50%)';
    this.instructions.style.width = '100%';
    this.instructions.style.textAlign = 'center';
    this.instructions.style.color = '#fff';
    this.instructions.style.fontFamily = 'monospace';
    this.instructions.style.fontSize = this.isTouchDevice ? '14px' : '18px';
    this.instructions.style.lineHeight = '1.55';
    this.instructions.style.maxWidth = this.isTouchDevice ? 'calc(100vw - 24px)' : 'none';
    this.instructions.style.boxSizing = 'border-box';
    this.instructions.style.padding = this.isTouchDevice ? '14px 16px' : '0';
    this.instructions.style.borderRadius = this.isTouchDevice ? '16px' : '0';
    this.instructions.style.background = this.isTouchDevice ? 'rgba(0, 0, 0, 0.48)' : 'transparent';
    this.instructions.style.backdropFilter = this.isTouchDevice ? 'blur(10px)' : 'none';
    this.instructions.style.border = this.isTouchDevice ? '1px solid rgba(255, 255, 255, 0.12)' : 'none';
    this.instructions.style.pointerEvents = 'none';
    this.instructions.style.top = this.isTouchDevice ? 'auto' : '50%';
    this.instructions.style.bottom = this.isTouchDevice ? '18px' : 'auto';
    this.instructions.style.left = this.isTouchDevice ? '50%' : '0';
    this.instructions.innerHTML = this.isTouchDevice
      ? 'Tap the scene to start<br/><br/>Desktop: W A S D to move<br/>Space: auto-launch'
      : 'Click to Look Around<br/><br/>W A S D to Move<br/><br/>Click while locked to launch a firework<br/><br/>Press SPACE for auto-launch mode';
    this.instructions.style.textShadow = '0px 0px 5px rgba(0,0,0,1)';
    document.body.appendChild(this.instructions);

    if (this.isTouchDevice) {
      this.setupTouchControls();
    }

    this.statusOverlay = document.createElement('div');
    this.statusOverlay.style.position = 'absolute';
    this.statusOverlay.style.top = '12px';
    this.statusOverlay.style.left = '12px';
    this.statusOverlay.style.padding = '8px 12px';
    this.statusOverlay.style.background = 'rgba(0, 0, 0, 0.55)';
    this.statusOverlay.style.color = '#fff';
    this.statusOverlay.style.fontFamily = 'monospace';
    this.statusOverlay.style.fontSize = this.isTouchDevice ? '11px' : '12px';
    this.statusOverlay.style.lineHeight = '1.4';
    this.statusOverlay.style.borderRadius = '8px';
    this.statusOverlay.style.zIndex = '100';
    this.statusOverlay.style.pointerEvents = 'none';
    if (this.isTouchDevice) {
      this.statusOverlay.style.top = '10px';
      this.statusOverlay.style.left = '10px';
      this.statusOverlay.style.right = '10px';
      this.statusOverlay.style.width = 'auto';
      this.statusOverlay.style.maxWidth = 'calc(100vw - 20px)';
      this.statusOverlay.style.textAlign = 'center';
    }
    document.body.appendChild(this.statusOverlay);
    this.updateStatusOverlay();

    this.controls.addEventListener('lock', () => {
      this.instructions.style.display = 'none';
      this.status.looking = false;
      this.updateStatusOverlay();
    });
    this.controls.addEventListener('unlock', () => {
      this.instructions.style.display = this.isTouchDevice ? 'block' : '';
      this.status.moving = false;
      this.status.direction = 'idle';
      this.updateStatusOverlay();
    });
  }

  updateStatusOverlay() {
    if (!this.statusOverlay) return;
    const locked = this.controls.isLocked ? 'Yes' : 'No';
    const moving = this.status.moving ? 'Yes' : 'No';
    this.statusOverlay.innerHTML = `Locked: ${locked}<br>Moving: ${moving} (${this.status.direction})<br>Looking: ${this.status.looking ? 'Yes' : 'No'}`;
  }

  setupTouchControls() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '50%';
    container.style.bottom = '18px';
    container.style.transform = 'translateX(-50%)';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = '56px 56px 56px';
    container.style.gridTemplateRows = '56px 56px';
    container.style.gap = '10px';
    container.style.zIndex = '120';
    container.style.touchAction = 'none';
    container.style.userSelect = 'none';
    container.style.webkitUserSelect = 'none';
    document.body.appendChild(container);
    this.touchControls = container;

    const createButton = (label, key, gridColumn, gridRow) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = label;
      button.style.gridColumn = gridColumn;
      button.style.gridRow = gridRow;
      button.style.width = '56px';
      button.style.height = '56px';
      button.style.border = '1px solid rgba(255, 255, 255, 0.18)';
      button.style.borderRadius = '16px';
      button.style.background = 'rgba(0, 0, 0, 0.48)';
      button.style.color = '#fff';
      button.style.fontFamily = 'monospace';
      button.style.fontSize = '16px';
      button.style.fontWeight = '600';
      button.style.letterSpacing = '0.03em';
      button.style.backdropFilter = 'blur(10px)';
      button.style.webkitBackdropFilter = 'blur(10px)';
      button.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.25)';
      button.style.touchAction = 'none';
      button.style.userSelect = 'none';
      button.style.webkitUserSelect = 'none';
      button.style.webkitTapHighlightColor = 'transparent';

      const setPressed = (pressed) => {
        this.setMovementKey(key, pressed);
        button.style.transform = pressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)';
        button.style.background = pressed ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.48)';
      };

      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        button.setPointerCapture?.(event.pointerId);
        setPressed(true);
      });
      button.addEventListener('pointerup', (event) => {
        event.preventDefault();
        setPressed(false);
      });
      button.addEventListener('pointercancel', () => setPressed(false));
      button.addEventListener('pointerleave', () => {
        if (!button.matches(':active')) {
          setPressed(false);
        }
      });
      button.addEventListener('contextmenu', (event) => event.preventDefault());

      container.appendChild(button);
      this.touchButtons.set(key, button);
      return button;
    };

    createButton('W', 'forward', '2', '1');
    createButton('A', 'left', '1', '2');
    createButton('S', 'backward', '2', '2');
    createButton('D', 'right', '3', '2');

    window.addEventListener('pointerup', () => {
      this.setMovementKey('forward', false);
      this.setMovementKey('backward', false);
      this.setMovementKey('left', false);
      this.setMovementKey('right', false);
      this.refreshTouchButtonState();
    });
    window.addEventListener('blur', () => {
      this.setMovementKey('forward', false);
      this.setMovementKey('backward', false);
      this.setMovementKey('left', false);
      this.setMovementKey('right', false);
      this.refreshTouchButtonState();
    });
  }

  setMovementKey(key, pressed) {
    if (!(key in this.keys)) return;
    this.keys[key] = pressed;
    this.refreshTouchButtonState();
  }

  refreshTouchButtonState() {
    if (!this.touchButtons) return;

    for (const [key, button] of this.touchButtons.entries()) {
      const pressed = this.keys[key];
      button.style.transform = pressed ? 'translateY(1px) scale(0.98)' : 'translateY(0) scale(1)';
      button.style.background = pressed ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.48)';
    }
  }

  onMouseMove(event) {
    if (!this.controls.isLocked) return;
    this.status.looking = true;
    this.updateStatusOverlay();
    clearTimeout(this.lookTimer);
    this.lookTimer = setTimeout(() => {
      this.status.looking = false;
      this.updateStatusOverlay();
    }, 150);
  }

  onKeyDown(event) {
    if(!this.controls.isLocked) return;
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.keys.forward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.backward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = true;
        break;
      case 'Space':
        if (this.fireworkSystem) {
          this.fireworkSystem.autoLaunchEnabled = !this.fireworkSystem.autoLaunchEnabled;
          console.log('Auto launch:', this.fireworkSystem.autoLaunchEnabled ? 'ON' : 'OFF');
        }
        break;
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.keys.forward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.backward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = false;
        break;
    }
  }

  setMovementStatus(direction) {
    const moving = direction !== '' && direction !== 'idle';
    this.status.moving = moving;
    this.status.direction = moving ? direction : 'idle';
    this.updateStatusOverlay();
  }
}
