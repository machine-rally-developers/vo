"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var graphql = __importStar(require("graphql"));
var module_read_1 = __importDefault(require("../../mongoose/crud/module.read"));
var module_delete_1 = __importDefault(require("../../mongoose/crud/module.delete"));
var boom_1 = __importDefault(require("boom"));
var GraphQLObjectType = graphql.GraphQLObjectType, GraphQLID = graphql.GraphQLID, GraphQLString = graphql.GraphQLString, GraphQLList = graphql.GraphQLList, GraphQLNonNull = graphql.GraphQLNonNull, GraphQLError = graphql.GraphQLError;
/**
 * This variable defines the property of a module
 */
var variableType = new GraphQLObjectType({
    name: "variables",
    fields: function () { return ({
        key: {
            type: GraphQLString
        },
        value: {
            type: GraphQLString
        }
    }); }
});
var moduleType = new GraphQLObjectType({
    name: "modules",
    fields: function () { return ({
        _id: {
            type: GraphQLID
        },
        description: {
            type: GraphQLString
        },
        licence: {
            type: GraphQLString
        },
        email: {
            type: GraphQLID
        },
        summary: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        packageName: {
            type: GraphQLID
        },
        authors: {
            type: new GraphQLList(GraphQLString)
        },
        tags: {
            type: new GraphQLList(GraphQLString)
        },
        triggers: {
            type: new GraphQLList(GraphQLString)
        },
        variables: {
            type: new GraphQLList(variableType)
        }
    }); }
});
var listInstalledModules = {
    type: new GraphQLList(moduleType),
    resolve: function (parents, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, module_read_1["default"]({})];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }
};
exports.listInstalledModules = listInstalledModules;
var getInstalledModulesById = {
    type: new GraphQLList(moduleType),
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: function (parents, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, module_read_1["default"]({ _id: args.id })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    }
};
exports.getInstalledModulesById = getInstalledModulesById;
var deleteInstalledModule = {
    type: moduleType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve: function (parents, args) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, module_delete_1["default"](args.id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        error = new GraphQLError(e_1.message);
                        return [2 /*return*/, boom_1["default"].boomify(error, { statusCode: 400 }).output];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
exports.deleteInstalledModule = deleteInstalledModule;
//# sourceMappingURL=installed-modules.js.map