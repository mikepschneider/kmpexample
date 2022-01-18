(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'uuid-js-legacy'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'uuid-js-legacy'.");
    }root['uuid-js-legacy'] = factory(typeof this['uuid-js-legacy'] === 'undefined' ? {} : this['uuid-js-legacy'], kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var CharRange = Kotlin.kotlin.ranges.CharRange;
  var plus = Kotlin.kotlin.collections.plus_q4559j$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var encodeToByteArray = Kotlin.kotlin.text.encodeToByteArray_pdl1vz$;
  var toByte = Kotlin.toByte;
  var copyOf = Kotlin.kotlin.collections.copyOf_mrm5p$;
  var Random = Kotlin.kotlin.random.Random;
  var L0 = Kotlin.Long.ZERO;
  var L255 = Kotlin.Long.fromInt(255);
  var downTo = Kotlin.kotlin.ranges.downTo_dqglrj$;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var unboxChar = Kotlin.unboxChar;
  var concatToString = Kotlin.kotlin.text.concatToString_355ntz$;
  var contentEquals = Kotlin.arrayEquals;
  var contentHashCode = Kotlin.arrayHashCode;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Comparable = Kotlin.kotlin.Comparable;
  var L15 = Kotlin.Long.fromInt(15);
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var wrapFunction = Kotlin.wrapFunction;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  var Collection = Kotlin.kotlin.collections.Collection;
  function get_uuid($receiver) {
    return get_bytes($receiver);
  }
  var UUID_BYTES;
  var UUID_STRING_LENGTH;
  var UUID_CHAR_RANGES;
  var UUID_HYPHEN_INDICES;
  var UUID_CHARS;
  function UuidHasher() {
  }
  UuidHasher.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'UuidHasher',
    interfaces: []
  };
  function nameBasedUuidOf(namespace, name, hasher) {
    hasher.update_fqrh44$(get_bytes(namespace));
    hasher.update_fqrh44$(encodeToByteArray(name));
    var hashedBytes = hasher.digest();
    hashedBytes[6] = toByte(toByte(hashedBytes[6] & 15) | toByte(hasher.version << 4));
    hashedBytes[8] = toByte(toByte(hashedBytes[8] & 63) | (-128 | 0));
    return uuidOf(copyOf(hashedBytes, 16));
  }
  function getRandomUuidBytes() {
    return Random.Default.nextBytes_za3lpa$(16);
  }
  function freeze($receiver) {
    return $receiver;
  }
  function Uuid(uuidBytes) {
    Uuid$Companion_getInstance();
    this.uuidBytes_8be2vx$ = uuidBytes;
    if (!(this.uuidBytes_8be2vx$.length === 16)) {
      var message = 'Invalid UUID bytes. Expected ' + '16' + ' bytes; found ' + this.uuidBytes_8be2vx$.length;
      throw IllegalArgumentException_init(message.toString());
    }freeze(this);
  }
  Object.defineProperty(Uuid.prototype, 'mostSignificantBits', {
    configurable: true,
    get: function () {
      return Uuid$Companion_getInstance().bits_0(this.uuidBytes_8be2vx$, 0, 8);
    }
  });
  Object.defineProperty(Uuid.prototype, 'leastSignificantBits', {
    configurable: true,
    get: function () {
      return Uuid$Companion_getInstance().bits_0(this.uuidBytes_8be2vx$, 8, 16);
    }
  });
  function Uuid$Companion() {
    Uuid$Companion_instance = this;
    this.uuidByteRanges_0 = listOf([until(0, 4), until(4, 6), until(6, 8), until(8, 10), until(10, 16)]);
  }
  Uuid$Companion.prototype.bits_0 = function ($receiver, start, end) {
    var b = L0;
    var i = start;
    do {
      b = b.shiftLeft(8).or(Kotlin.Long.fromInt($receiver[i]).and(L255));
    }
     while ((i = i + 1 | 0, i) < end);
    return b;
  };
  Uuid$Companion.prototype.fromBits_0 = function (msb, lsb) {
    var $receiver = new Int8Array(16);
    var tmp$;
    var accumulator = msb;
    tmp$ = downTo(7, 0).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var x = accumulator;
      $receiver[element] = toByte(x.and(L255).toInt());
      accumulator = x.shiftRight(8);
    }
    var tmp$_0;
    var accumulator_0 = lsb;
    tmp$_0 = downTo(15, 8).iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      var x_0 = accumulator_0;
      $receiver[element_0] = toByte(x_0.and(L255).toInt());
      accumulator_0 = x_0.shiftRight(8);
    }
    return $receiver;
  };
  Uuid$Companion.prototype.halfByteFromChar_0 = function (char) {
    if ((new CharRange(48, 57)).contains_mef7kx$(char)) {
      return (char | 0) - 48 | 0;
    } else if ((new CharRange(97, 102)).contains_mef7kx$(char)) {
      return (char | 0) - 87 | 0;
    } else if ((new CharRange(65, 70)).contains_mef7kx$(char)) {
      return (char | 0) - 55 | 0;
    } else
      return null;
  };
  Uuid$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Uuid$Companion_instance = null;
  function Uuid$Companion_getInstance() {
    if (Uuid$Companion_instance === null) {
      new Uuid$Companion();
    }return Uuid$Companion_instance;
  }
  Uuid.prototype.toString = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
    var characters = Kotlin.charArray(36);
    var charIndex = 0;
    tmp$ = Uuid$Companion_getInstance().uuidByteRanges_0.iterator();
    while (tmp$.hasNext()) {
      var range = tmp$.next();
      tmp$_0 = range.first;
      tmp$_1 = range.last;
      tmp$_2 = range.step;
      for (var i = tmp$_0; i <= tmp$_1; i += tmp$_2) {
        var octetPair = this.uuidBytes_8be2vx$[i];
        var left = octetPair >> 4 & 15;
        var right = octetPair & 15;
        characters[tmp$_3 = charIndex, charIndex = tmp$_3 + 1 | 0, tmp$_3] = unboxChar(UUID_CHARS.get_za3lpa$(left));
        characters[tmp$_4 = charIndex, charIndex = tmp$_4 + 1 | 0, tmp$_4] = unboxChar(UUID_CHARS.get_za3lpa$(right));
      }
      if (charIndex < 36) {
        characters[tmp$_5 = charIndex, charIndex = tmp$_5 + 1 | 0, tmp$_5] = 45;
      }}
    return concatToString(characters);
  };
  Uuid.prototype.equals = function (other) {
    return Kotlin.isType(other, Uuid) && contentEquals(this.uuidBytes_8be2vx$, other.uuidBytes_8be2vx$);
  };
  Uuid.prototype.hashCode = function () {
    return contentHashCode(this.uuidBytes_8be2vx$);
  };
  Uuid.prototype.compareTo_11rb$ = function (other) {
    for (var i = 0; i < 16; i++) {
      var compareResult = Kotlin.primitiveCompareTo(this.uuidBytes_8be2vx$[i], other.uuidBytes_8be2vx$[i]);
      if (compareResult !== 0)
        return compareResult;
    }
    return 0;
  };
  Uuid.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Uuid',
    interfaces: [Comparable]
  };
  function Uuid_init(msb, lsb, $this) {
    $this = $this || Object.create(Uuid.prototype);
    Uuid.call($this, Uuid$Companion_getInstance().fromBits_0(msb, lsb));
    return $this;
  }
  function get_bytes($receiver) {
    return $receiver.uuidBytes_8be2vx$;
  }
  function get_variant($receiver) {
    return $receiver.leastSignificantBits.shiftRightUnsigned(Kotlin.Long.fromInt(64).subtract($receiver.leastSignificantBits.shiftRightUnsigned(62)).toInt()).and($receiver.leastSignificantBits.shiftRight(63)).toInt();
  }
  function get_version($receiver) {
    return $receiver.mostSignificantBits.shiftRight(12).and(L15).toInt();
  }
  var setVersion = defineInlineFunction('uuid-js-legacy.com.benasher44.uuid.setVersion_767k4w$', wrapFunction(function () {
    var toByte = Kotlin.toByte;
    return function ($receiver, version) {
      $receiver[6] = toByte($receiver[6] & 15 | version << 4);
      $receiver[8] = toByte($receiver[8] & 63 | 128);
      return $receiver;
    };
  }));
  function uuidOf(bytes) {
    return new Uuid(bytes);
  }
  function halfByteFromChar(char) {
    if ((new CharRange(48, 57)).contains_mef7kx$(char)) {
      return (char | 0) - 48 | 0;
    } else if ((new CharRange(97, 102)).contains_mef7kx$(char)) {
      return (char | 0) - 87 | 0;
    } else if ((new CharRange(65, 70)).contains_mef7kx$(char)) {
      return (char | 0) - 55 | 0;
    } else
      return null;
  }
  function uuidFrom(string) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    if (!(string.length === 36)) {
      var message = 'Uuid string has invalid length: ' + string;
      throw IllegalArgumentException_init(message.toString());
    }var $receiver = UUID_HYPHEN_INDICES;
    var all$result;
    all$break: do {
      var tmp$_3;
      if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
        all$result = true;
        break all$break;
      }tmp$_3 = $receiver.iterator();
      while (tmp$_3.hasNext()) {
        var element = tmp$_3.next();
        if (!(string.charCodeAt(element) === 45)) {
          all$result = false;
          break all$break;
        }}
      all$result = true;
    }
     while (false);
    if (!all$result) {
      var message_0 = 'Uuid string has invalid format: ' + string;
      throw IllegalArgumentException_init(message_0.toString());
    }var bytes = new Int8Array(16);
    var byte = 0;
    tmp$ = UUID_CHAR_RANGES.iterator();
    while (tmp$.hasNext()) {
      var range = tmp$.next();
      var i = range.first;
      while (i < range.last) {
        var left = halfByteFromChar(string.charCodeAt((tmp$_0 = i, i = tmp$_0 + 1 | 0, tmp$_0)));
        var right = halfByteFromChar(string.charCodeAt((tmp$_1 = i, i = tmp$_1 + 1 | 0, tmp$_1)));
        if (!(left != null && right != null)) {
          var message_1 = 'Uuid string has invalid characters: ' + string;
          throw IllegalArgumentException_init(message_1.toString());
        }bytes[tmp$_2 = byte, byte = tmp$_2 + 1 | 0, tmp$_2] = toByte(left << 4 | right);
      }
    }
    return new Uuid(bytes);
  }
  function uuid4() {
    var $receiver = getRandomUuidBytes();
    $receiver[6] = toByte($receiver[6] & 15 | 4 << 4);
    $receiver[8] = toByte($receiver[8] & 63 | 128);
    return new Uuid($receiver);
  }
  var package$com = _.com || (_.com = {});
  var package$benasher44 = package$com.benasher44 || (package$com.benasher44 = {});
  var package$uuid = package$benasher44.uuid || (package$benasher44.uuid = {});
  package$uuid.get_uuid_7vmqba$ = get_uuid;
  Object.defineProperty(package$uuid, 'UUID_BYTES_8be2vx$', {
    get: function () {
      return UUID_BYTES;
    }
  });
  Object.defineProperty(package$uuid, 'UUID_STRING_LENGTH_8be2vx$', {
    get: function () {
      return UUID_STRING_LENGTH;
    }
  });
  Object.defineProperty(package$uuid, 'UUID_CHAR_RANGES_8be2vx$', {
    get: function () {
      return UUID_CHAR_RANGES;
    }
  });
  Object.defineProperty(package$uuid, 'UUID_HYPHEN_INDICES_8be2vx$', {
    get: function () {
      return UUID_HYPHEN_INDICES;
    }
  });
  Object.defineProperty(package$uuid, 'UUID_CHARS_8be2vx$', {
    get: function () {
      return UUID_CHARS;
    }
  });
  package$uuid.UuidHasher = UuidHasher;
  package$uuid.nameBasedUuidOf_o3tv9x$ = nameBasedUuidOf;
  package$uuid.getRandomUuidBytes_8be2vx$ = getRandomUuidBytes;
  package$uuid.freeze_fbcm8g$ = freeze;
  package$uuid.Uuid_init_3pjtqy$ = Uuid_init;
  package$uuid.Uuid = Uuid;
  package$uuid.get_bytes_7vmqba$ = get_bytes;
  package$uuid.get_variant_7vmqba$ = get_variant;
  package$uuid.get_version_7vmqba$ = get_version;
  package$uuid.setVersion_767k4w$ = setVersion;
  package$uuid.uuidOf_fqrh44$ = uuidOf;
  package$uuid.uuidFrom_61zpoe$ = uuidFrom;
  $$importsForInline$$['uuid-js-legacy'] = _;
  package$uuid.uuid4 = uuid4;
  UUID_BYTES = 16;
  UUID_STRING_LENGTH = 36;
  UUID_CHAR_RANGES = listOf([until(0, 8), until(9, 13), until(14, 18), until(19, 23), until(24, 36)]);
  UUID_HYPHEN_INDICES = listOf([8, 13, 18, 23]);
  UUID_CHARS = plus(new CharRange(48, 57), new CharRange(97, 102));
  Kotlin.defineModule('uuid-js-legacy', _);
  return _;
}));

//# sourceMappingURL=uuid-js-legacy.js.map
