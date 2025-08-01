import { configure } from 'arktype/config';

configure({
	after: {
		message: 'after'
	},
	before: {
		message: 'before'
	},
	divisor: {
		message: 'divisor'
	},
	domain: {
		message: 'domain'
	},
	exactLength: {
		message: 'exact_length'
	},
	intersection: {
		message: 'intersection'
	},
	max: {
		message: 'max'
	},
	maxLength: {
		message: 'max_length'
	},
	min: {
		message: 'min'
	},
	minLength: {
		message: 'min_length'
	},
	pattern: {
		message: 'pattern'
	},
	predicate: {
		message: 'predicate'
	},
	proto: {
		message: 'proto'
	},
	required: {
		message: 'required'
	},
	union: {
		message: 'union'
	},
	unit: {
		message: 'unit'
	},
	keywords: {
		'Array.index': {
			message: 'array.index'
		},
		'Array.readonly': {
			message: 'array.readonly'
		},
		'FormData.parse': {
			message: 'form_data.parse'
		},
		'FormData.parsed': {
			message: 'form_data.parsed'
		},
		'FormData.value': {
			message: 'form_data.value'
		},
		'TypedArray.BigInt64': {
			message: 'typed_array.bigint64'
		},
		'TypedArray.BigUint64': {
			message: 'typed_array.biguint64'
		},
		'TypedArray.Float32': {
			message: 'typed_array.float32'
		},
		'TypedArray.Float64': {
			message: 'typed_array.float64'
		},
		'TypedArray.Int16': {
			message: 'typed_array.int16'
		},
		'TypedArray.Int32': {
			message: 'typed_array.int32'
		},
		'TypedArray.Int8': {
			message: 'typed_array.int8'
		},
		'TypedArray.Uint16': {
			message: 'typed_array.uint16'
		},
		'TypedArray.Uint32': {
			message: 'typed_array.uint32'
		},
		'TypedArray.Uint8': {
			message: 'typed_array.uint8'
		},
		'TypedArray.Uint8Clamped': {
			message: 'typed_array.uint8_clamped'
		},
		'number.Infinity': {
			message: 'number.infinity'
		},
		'number.NaN': {
			message: 'number.nan'
		},
		'number.NegativeInfinity': {
			message: 'number.negative_infinity'
		},
		'number.epoch': {
			message: 'number.epoch'
		},
		'number.safe': {
			message: 'number.safe'
		},
		'number.integer': {
			message: 'number.integer'
		},
		'object.json': {
			message: 'object.json'
		},
		'object.json.stringify': {
			message: 'object.json.stringify'
		},
		'string.alpha': {
			message: 'string.alpha'
		},
		'string.alphanumeric': {
			message: 'string.alphanumeric'
		},
		'string.base64': {
			message: 'string.base64'
		},
		'string.base64.url': {
			message: 'string.base64.url'
		},
		'string.capitalize': {
			message: 'string.capitalize'
		},
		'string.capitalize.preformatted': {
			message: 'string.capitalize.preformatted'
		},
		'string.creditCard': {
			message: 'string.credit_card'
		},
		'string.date': {
			message: 'string.date'
		},
		'string.date.epoch': {
			message: 'string.date.epoch'
		},
		'string.integer.parse': {
			message: 'string.integer.parse'
		},
		string: {
			message: 'string'
		},
		'string.email': {
			message: 'string.email'
		},
		'string.date.epoch.parse': {
			message: 'string.date.epoch.parse'
		},
		'string.date.iso': {
			message: 'string.date.iso'
		},
		'string.date.iso.parse': {
			message: 'string.date.iso.parse'
		},
		'string.date.parse': {
			message: 'string.date.parse'
		},
		'string.digits': {
			message: 'string.digits'
		},
		'string.hex': {
			message: 'string.hex'
		},
		'string.integer': {
			message: 'string.integer'
		},
		'string.ip': {
			message: 'string.ip'
		},
		'string.ip.v4': {
			message: 'string.ip.v4'
		},
		'string.ip.v6': {
			message: 'string.ip.v6'
		},
		'string.json': {
			message: 'string.json'
		},
		'string.json.parse': {
			message: 'string.json.parse'
		},
		'string.lower': {
			message: 'string.lower'
		},
		'string.lower.preformatted': {
			message: 'string.lower.preformatted'
		},
		'string.normalize': {
			message: 'string.normalize'
		},
		'string.normalize.NFC': {
			message: 'string.normalize.nfc'
		},
		'string.normalize.NFC.preformatted': {
			message: 'string.normalize.nfc.preformatted'
		},
		'string.normalize.NFD': {
			message: 'string.normalize.nfd'
		},
		'string.normalize.NFD.preformatted': {
			message: 'string.normalize.nfd.preformatted'
		},
		'string.normalize.NFKC': {
			message: 'string.normalize.nfkc'
		},
		'string.normalize.NFKC.preformatted': {
			message: 'string.normalize.nfkc.preformatted'
		},
		'string.normalize.NFKD': {
			message: 'string.normalize.nfkd'
		},
		'string.normalize.NFKD.preformatted': {
			message: 'string.normalize.nfkd.preformatted'
		},
		'string.numeric': {
			message: 'string.numeric'
		},
		'string.numeric.parse': {
			message: 'string.numeric.parse'
		},
		'string.regex': {
			message: 'string.regex'
		},
		'string.semver': {
			message: 'string.semver'
		},
		'string.trim': {
			message: 'string.trim'
		},
		'string.trim.preformatted': {
			message: 'string.trim.preformatted'
		},
		'string.upper': {
			message: 'string.upper'
		},
		'string.upper.preformatted': {
			message: 'string.upper.preformatted'
		},
		'string.url': {
			message: 'string.url'
		},
		'string.url.parse': {
			message: 'string.url.parse'
		},
		'string.uuid': {
			message: 'string.uuid'
		},
		'string.uuid.v1': {
			message: 'string.uuid.v1'
		},
		'string.uuid.v2': {
			message: 'string.uuid.v2'
		},
		'string.uuid.v3': {
			message: 'string.uuid.v3'
		},
		'string.uuid.v4': {
			message: 'string.uuid.v4'
		},
		'string.uuid.v5': {
			message: 'string.uuid.v5'
		},
		'string.uuid.v6': {
			message: 'string.uuid.v6'
		},
		'string.uuid.v7': {
			message: 'string.uuid.v7'
		},
		'string.uuid.v8': {
			message: 'string.uuid.v8'
		},
		'unknown.any': {
			message: 'unknown.any'
		},
		Array: {
			message: 'array'
		},
		ArrayBuffer: {
			message: 'array_buffer'
		},
		Blob: {
			message: 'blob'
		},
		Date: {
			message: 'date'
		},
		Error: {
			message: 'error'
		},
		File: {
			message: 'file'
		},
		FormData: {
			message: 'form_data'
		},
		Function: {
			message: 'function'
		},
		Headers: {
			message: 'headers'
		},
		Key: {
			message: 'key'
		},
		Map: {
			message: 'map'
		},
		Promise: {
			message: 'promise'
		},
		RegExp: {
			message: 'regexp'
		},
		Request: {
			message: 'request'
		},
		Response: {
			message: 'response'
		},
		Set: {
			message: 'set'
		},
		URL: {
			message: 'url'
		},
		WeakMap: {
			message: 'weak_map'
		},
		WeakSet: {
			message: 'weak_set'
		},
		bigint: {
			message: 'bigint'
		},
		boolean: {
			message: 'boolean'
		},
		false: {
			message: 'false'
		},
		never: {
			message: 'never'
		},
		null: {
			message: 'null'
		},
		number: {
			message: 'number'
		},
		object: {
			message: 'object'
		},
		symbol: {
			message: 'symbol'
		},
		true: {
			message: 'true'
		},
		undefined: {
			message: 'undefined'
		},
		unknown: {
			message: 'unknown'
		}
	}
});
