import Character from './essentials/Character.js';
import Player from './essentials/Player.js';

class CollectibleItem extends Character {
    constructor(data = null, gameEnv = null) {
        super(data, gameEnv);
        this.collected = false;
        this.onCollect = data?.onCollect || null;

        if (data?.zIndex) {
            this.canvas.style.zIndex = String(data.zIndex);
        }
    }

    update() {
        if (this.collected) return;
        this.draw();
        this.checkPlayerCollision();
    }

    draw() {
        if (this.collected) return;
        super.draw();
    }

    checkPlayerCollision() {
        if (this.collected) return;
        for (const gameObj of this.gameEnv.gameObjects) {
            const id = String(gameObj?.id ?? gameObj?.spriteData?.id ?? '').toLowerCase();
            const isPlayer = gameObj instanceof Player || id.includes('player') || id.includes('sailor');
            if (!isPlayer) continue;
            this.isCollision(gameObj);
            if (this.collisionData.hit) {
                this.collect();
                return;
            }
        }
    }

    collect() {
        this.collected = true;

        if (this.onCollect) {
            this.onCollect();
        }

        // Hide the canvas
        if (this.canvas) {
            this.canvas.style.display = 'none';
        }

        // Remove from game objects
        const index = this.gameEnv?.gameObjects?.indexOf(this);
        if (index > -1) {
            this.gameEnv.gameObjects.splice(index, 1);
        }
    }

    destroy() {
        if (super.destroy) {
            super.destroy();
        } else {
            if (this.canvas && this.canvas.parentNode) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
            const index = this.gameEnv?.gameObjects?.indexOf(this);
            if (index > -1) {
                this.gameEnv.gameObjects.splice(index, 1);
            }
        }
    }
}

export default CollectibleItem;
