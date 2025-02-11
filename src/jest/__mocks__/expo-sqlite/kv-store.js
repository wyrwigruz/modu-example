let store = {};

module.exports = {
	setItem: jest.fn((key, value) => {
		store[key] = value;
		return Promise.resolve();
	}),

	getItem: jest.fn(key => {
		return Promise.resolve(Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null);
	}),

	getItemSync: jest.fn(key => {
		return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
	}),

	removeItem: jest.fn(key => {
		delete store[key];
		return Promise.resolve();
	}),

	clear: jest.fn(() => {
		store = {};
		return Promise.resolve();
	}),

	_resetStore: () => {
		store = {};
	},
};
