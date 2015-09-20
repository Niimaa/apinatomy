/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

export default {

	canvas: !!window.CanvasRenderingContext2D,
	webgl: (() => {
		try {
			let canvas = document.createElement('canvas');
			return !!( window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) );
		} catch (e) {
			return false;
		}
	})(),
	assert3DSupport() {
		if (!this.webgl) {
			let message = window.WebGLRenderingContext ?
				'Your graphics card does not seem to support WebGL.' :
				'Your browser does not seem to support WebGL.';
			throw new Error(message);
		}
	}

};
