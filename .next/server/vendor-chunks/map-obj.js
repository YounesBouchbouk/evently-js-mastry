"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/map-obj";
exports.ids = ["vendor-chunks/map-obj"];
exports.modules = {

/***/ "(rsc)/./node_modules/map-obj/index.js":
/*!***************************************!*\
  !*** ./node_modules/map-obj/index.js ***!
  \***************************************/
/***/ ((module) => {

eval("\n\nconst isObject = value => typeof value === 'object' && value !== null;\nconst mapObjectSkip = Symbol('skip');\n\n// Customized for this use-case\nconst isObjectCustom = value =>\n\tisObject(value) &&\n\t!(value instanceof RegExp) &&\n\t!(value instanceof Error) &&\n\t!(value instanceof Date);\n\nconst mapObject = (object, mapper, options, isSeen = new WeakMap()) => {\n\toptions = {\n\t\tdeep: false,\n\t\ttarget: {},\n\t\t...options\n\t};\n\n\tif (isSeen.has(object)) {\n\t\treturn isSeen.get(object);\n\t}\n\n\tisSeen.set(object, options.target);\n\n\tconst {target} = options;\n\tdelete options.target;\n\n\tconst mapArray = array => array.map(element => isObjectCustom(element) ? mapObject(element, mapper, options, isSeen) : element);\n\tif (Array.isArray(object)) {\n\t\treturn mapArray(object);\n\t}\n\n\tfor (const [key, value] of Object.entries(object)) {\n\t\tconst mapResult = mapper(key, value, object);\n\n\t\tif (mapResult === mapObjectSkip) {\n\t\t\tcontinue;\n\t\t}\n\n\t\tlet [newKey, newValue, {shouldRecurse = true} = {}] = mapResult;\n\n\t\t// Drop `__proto__` keys.\n\t\tif (newKey === '__proto__') {\n\t\t\tcontinue;\n\t\t}\n\n\t\tif (options.deep && shouldRecurse && isObjectCustom(newValue)) {\n\t\t\tnewValue = Array.isArray(newValue) ?\n\t\t\t\tmapArray(newValue) :\n\t\t\t\tmapObject(newValue, mapper, options, isSeen);\n\t\t}\n\n\t\ttarget[newKey] = newValue;\n\t}\n\n\treturn target;\n};\n\nmodule.exports = (object, mapper, options) => {\n\tif (!isObject(object)) {\n\t\tthrow new TypeError(`Expected an object, got \\`${object}\\` (${typeof object})`);\n\t}\n\n\treturn mapObject(object, mapper, options);\n};\n\nmodule.exports.mapObjectSkip = mapObjectSkip;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbWFwLW9iai9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSxRQUFRO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixzQkFBc0IsSUFBSTs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxPQUFPLE1BQU0sY0FBYztBQUM5RTs7QUFFQTtBQUNBOztBQUVBLDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL3VuaXZlcnNpdGllc2V2ZW50cy8uL25vZGVfbW9kdWxlcy9tYXAtb2JqL2luZGV4LmpzP2E0MjAiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBpc09iamVjdCA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGw7XG5jb25zdCBtYXBPYmplY3RTa2lwID0gU3ltYm9sKCdza2lwJyk7XG5cbi8vIEN1c3RvbWl6ZWQgZm9yIHRoaXMgdXNlLWNhc2VcbmNvbnN0IGlzT2JqZWN0Q3VzdG9tID0gdmFsdWUgPT5cblx0aXNPYmplY3QodmFsdWUpICYmXG5cdCEodmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApICYmXG5cdCEodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikgJiZcblx0ISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpO1xuXG5jb25zdCBtYXBPYmplY3QgPSAob2JqZWN0LCBtYXBwZXIsIG9wdGlvbnMsIGlzU2VlbiA9IG5ldyBXZWFrTWFwKCkpID0+IHtcblx0b3B0aW9ucyA9IHtcblx0XHRkZWVwOiBmYWxzZSxcblx0XHR0YXJnZXQ6IHt9LFxuXHRcdC4uLm9wdGlvbnNcblx0fTtcblxuXHRpZiAoaXNTZWVuLmhhcyhvYmplY3QpKSB7XG5cdFx0cmV0dXJuIGlzU2Vlbi5nZXQob2JqZWN0KTtcblx0fVxuXG5cdGlzU2Vlbi5zZXQob2JqZWN0LCBvcHRpb25zLnRhcmdldCk7XG5cblx0Y29uc3Qge3RhcmdldH0gPSBvcHRpb25zO1xuXHRkZWxldGUgb3B0aW9ucy50YXJnZXQ7XG5cblx0Y29uc3QgbWFwQXJyYXkgPSBhcnJheSA9PiBhcnJheS5tYXAoZWxlbWVudCA9PiBpc09iamVjdEN1c3RvbShlbGVtZW50KSA/IG1hcE9iamVjdChlbGVtZW50LCBtYXBwZXIsIG9wdGlvbnMsIGlzU2VlbikgOiBlbGVtZW50KTtcblx0aWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuXHRcdHJldHVybiBtYXBBcnJheShvYmplY3QpO1xuXHR9XG5cblx0Zm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqZWN0KSkge1xuXHRcdGNvbnN0IG1hcFJlc3VsdCA9IG1hcHBlcihrZXksIHZhbHVlLCBvYmplY3QpO1xuXG5cdFx0aWYgKG1hcFJlc3VsdCA9PT0gbWFwT2JqZWN0U2tpcCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0bGV0IFtuZXdLZXksIG5ld1ZhbHVlLCB7c2hvdWxkUmVjdXJzZSA9IHRydWV9ID0ge31dID0gbWFwUmVzdWx0O1xuXG5cdFx0Ly8gRHJvcCBgX19wcm90b19fYCBrZXlzLlxuXHRcdGlmIChuZXdLZXkgPT09ICdfX3Byb3RvX18nKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5kZWVwICYmIHNob3VsZFJlY3Vyc2UgJiYgaXNPYmplY3RDdXN0b20obmV3VmFsdWUpKSB7XG5cdFx0XHRuZXdWYWx1ZSA9IEFycmF5LmlzQXJyYXkobmV3VmFsdWUpID9cblx0XHRcdFx0bWFwQXJyYXkobmV3VmFsdWUpIDpcblx0XHRcdFx0bWFwT2JqZWN0KG5ld1ZhbHVlLCBtYXBwZXIsIG9wdGlvbnMsIGlzU2Vlbik7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0W25ld0tleV0gPSBuZXdWYWx1ZTtcblx0fVxuXG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChvYmplY3QsIG1hcHBlciwgb3B0aW9ucykgPT4ge1xuXHRpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBhbiBvYmplY3QsIGdvdCBcXGAke29iamVjdH1cXGAgKCR7dHlwZW9mIG9iamVjdH0pYCk7XG5cdH1cblxuXHRyZXR1cm4gbWFwT2JqZWN0KG9iamVjdCwgbWFwcGVyLCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1hcE9iamVjdFNraXAgPSBtYXBPYmplY3RTa2lwO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/map-obj/index.js\n");

/***/ })

};
;