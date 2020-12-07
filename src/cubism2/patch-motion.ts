// subclassing is impossible because it will be instantiated by `Live2DMotion.create()`
interface Live2DMotion {
    onFinishHandler?(motion: this): void
}

const originalUpdateParam = Live2DMotion.prototype.updateParam;

Live2DMotion.prototype.updateParam = function(model: Live2DModelWebGL, entry: MotionQueueEnt) {
    originalUpdateParam.call(this, model, entry);

    if (entry.isFinished() && this.onFinishHandler) {
        this.onFinishHandler(this);

        delete this.onFinishHandler;
    }
};
