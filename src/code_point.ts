import { NumberEx, NumberRange } from "../deps.ts";
import { Block } from "./block.ts";

function _isPlane(test: unknown): test is CodePoint.Plane {
  return Number.isSafeInteger(test) &&
    NumberEx.inRange(test as number, [0, 16]);
}

type _CodePointRange = NumberRange;

// https://www.unicode.org/Public/UNIDATA/Blocks.txt
const _BlockRange: Record<Block, _CodePointRange> = {
  [Block.C0_CONTROLS_AND_BASIC_LATIN]: [0x0, 0x7F],
  [Block.C1_CONTROLS_AND_LATIN_1_SUPPLEMENT]: [0x80, 0xFF],
  [Block.LATIN_EXTENDED_A]: [0x100, 0x17F],
  [Block.LATIN_EXTENDED_B]: [0x180, 0x24F],
  [Block.IPA_EXTENSIONS]: [0x250, 0x2AF],
  [Block.SPACING_MODIFIER_LETTERS]: [0x2B0, 0x2FF],
  [Block.COMBINING_DIACRITICAL_MARKS]: [0x300, 0x36F],
  [Block.GREEK_AND_COPTIC]: [0x370, 0x3FF],
  [Block.CYRILLIC]: [0x400, 0x4FF],
  [Block.CYRILLIC_SUPPLEMENT]: [0x500, 0x52F],
  [Block.ARMENIAN]: [0x530, 0x58F],
  [Block.HEBREW]: [0x590, 0x5FF],
  [Block.ARABIC]: [0x600, 0x6FF],
  [Block.SYRIAC]: [0x700, 0x74F],
  [Block.ARABIC_SUPPLEMENT]: [0x750, 0x77F],
  [Block.THAANA]: [0x780, 0x7BF],
  [Block.NKO]: [0x7C0, 0x7FF],
  [Block.SAMARITAN]: [0x800, 0x83F],
  [Block.MANDAIC]: [0x840, 0x85F],
  [Block.SYRIAC_SUPPLEMENT]: [0x860, 0x86F],
  [Block.ARABIC_EXTENDED_B]: [0x870, 0x89F],
  [Block.ARABIC_EXTENDED_A]: [0x8A0, 0x8FF],
  [Block.DEVANAGARI]: [0x900, 0x97F],
  [Block.BENGALI]: [0x980, 0x9FF],
  [Block.GURMUKHI]: [0xA00, 0xA7F],
  [Block.GUJARATI]: [0xA80, 0xAFF],
  [Block.ORIYA]: [0xB00, 0xB7F],
  [Block.TAMIL]: [0xB80, 0xBFF],
  [Block.TELUGU]: [0xC00, 0xC7F],
  [Block.KANNADA]: [0xC80, 0xCFF],
  [Block.MALAYALAM]: [0xD00, 0xD7F],
  [Block.SINHALA]: [0xD80, 0xDFF],
  [Block.THAI]: [0xE00, 0xE7F],
  [Block.LAO]: [0xE80, 0xEFF],
  [Block.TIBETAN]: [0xF00, 0xFFF],
  [Block.MYANMAR]: [0x1000, 0x109F],
  [Block.GEORGIAN]: [0x10A0, 0x10FF],
  [Block.HANGUL_JAMO]: [0x1100, 0x11FF],
  [Block.ETHIOPIC]: [0x1200, 0x137F],
  [Block.ETHIOPIC_SUPPLEMENT]: [0x1380, 0x139F],
  [Block.CHEROKEE]: [0x13A0, 0x13FF],
  [Block.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS]: [0x1400, 0x167F],
  [Block.OGHAM]: [0x1680, 0x169F],
  [Block.RUNIC]: [0x16A0, 0x16FF],
  [Block.TAGALOG]: [0x1700, 0x171F],
  [Block.HANUNOO]: [0x1720, 0x173F],
  [Block.BUHID]: [0x1740, 0x175F],
  [Block.TAGBANWA]: [0x1760, 0x177F],
  [Block.KHMER]: [0x1780, 0x17FF],
  [Block.MONGOLIAN]: [0x1800, 0x18AF],
  [Block.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS_EXTENDED]: [0x18B0, 0x18FF],
  [Block.LIMBU]: [0x1900, 0x194F],
  [Block.TAI_LE]: [0x1950, 0x197F],
  [Block.NEW_TAI_LUE]: [0x1980, 0x19DF],
  [Block.KHMER_SYMBOLS]: [0x19E0, 0x19FF],
  [Block.BUGINESE]: [0x1A00, 0x1A1F],
  [Block.TAI_THAM]: [0x1A20, 0x1AAF],
  [Block.COMBINING_DIACRITICAL_MARKS_EXTENDED]: [0x1AB0, 0x1AFF],
  [Block.BALINESE]: [0x1B00, 0x1B7F],
  [Block.SUNDANESE]: [0x1B80, 0x1BBF],
  [Block.BATAK]: [0x1BC0, 0x1BFF],
  [Block.LEPCHA]: [0x1C00, 0x1C4F],
  [Block.OL_CHIKI]: [0x1C50, 0x1C7F],
  [Block.CYRILLIC_EXTENDED_C]: [0x1C80, 0x1C8F],
  [Block.GEORGIAN_EXTENDED]: [0x1C90, 0x1CBF],
  [Block.SUNDANESE_SUPPLEMENT]: [0x1CC0, 0x1CCF],
  [Block.VEDIC_EXTENSIONS]: [0x1CD0, 0x1CFF],
  [Block.PHONETIC_EXTENSIONS]: [0x1D00, 0x1D7F],
  [Block.PHONETIC_EXTENSIONS_SUPPLEMENT]: [0x1D80, 0x1DBF],
  [Block.COMBINING_DIACRITICAL_MARKS_SUPPLEMENT]: [0x1DC0, 0x1DFF],
  [Block.LATIN_EXTENDED_ADDITIONAL]: [0x1E00, 0x1EFF],
  [Block.GREEK_EXTENDED]: [0x1F00, 0x1FFF],
  [Block.GENERAL_PUNCTUATION]: [0x2000, 0x206F],
  [Block.SUPERSCRIPTS_AND_SUBSCRIPTS]: [0x2070, 0x209F],
  [Block.CURRENCY_SYMBOLS]: [0x20A0, 0x20CF],
  [Block.COMBINING_DIACRITICAL_MARKS_FOR_SYMBOLS]: [0x20D0, 0x20FF],
  [Block.LETTERLIKE_SYMBOLS]: [0x2100, 0x214F],
  [Block.NUMBER_FORMS]: [0x2150, 0x218F],
  [Block.ARROWS]: [0x2190, 0x21FF],
  [Block.MATHEMATICAL_OPERATORS]: [0x2200, 0x22FF],
  [Block.MISCELLANEOUS_TECHNICAL]: [0x2300, 0x23FF],
  [Block.CONTROL_PICTURES]: [0x2400, 0x243F],
  [Block.OPTICAL_CHARACTER_RECOGNITION]: [0x2440, 0x245F],
  [Block.ENCLOSED_ALPHANUMERICS]: [0x2460, 0x24FF],
  [Block.BOX_DRAWING]: [0x2500, 0x257F],
  [Block.BLOCK_ELEMENTS]: [0x2580, 0x259F],
  [Block.GEOMETRIC_SHAPES]: [0x25A0, 0x25FF],
  [Block.MISCELLANEOUS_SYMBOLS]: [0x2600, 0x26FF],
  [Block.DINGBATS]: [0x2700, 0x27BF],
  [Block.MISCELLANEOUS_MATHEMATICAL_SYMBOLS_A]: [0x27C0, 0x27EF],
  [Block.SUPPLEMENTAL_ARROWS_A]: [0x27F0, 0x27FF],
  [Block.BRAILLE_PATTERNS]: [0x2800, 0x28FF],
  [Block.SUPPLEMENTAL_ARROWS_B]: [0x2900, 0x297F],
  [Block.MISCELLANEOUS_MATHEMATICAL_SYMBOLS_B]: [0x2980, 0x29FF],
  [Block.SUPPLEMENTAL_MATHEMATICAL_OPERATORS]: [0x2A00, 0x2AFF],
  [Block.MISCELLANEOUS_SYMBOLS_AND_ARROWS]: [0x2B00, 0x2BFF],
  [Block.GLAGOLITIC]: [0x2C00, 0x2C5F],
  [Block.LATIN_EXTENDED_C]: [0x2C60, 0x2C7F],
  [Block.COPTIC]: [0x2C80, 0x2CFF],
  [Block.GEORGIAN_SUPPLEMENT]: [0x2D00, 0x2D2F],
  [Block.TIFINAGH]: [0x2D30, 0x2D7F],
  [Block.ETHIOPIC_EXTENDED]: [0x2D80, 0x2DDF],
  [Block.CYRILLIC_EXTENDED_A]: [0x2DE0, 0x2DFF],
  [Block.SUPPLEMENTAL_PUNCTUATION]: [0x2E00, 0x2E7F],
  [Block.CJK_RADICALS_SUPPLEMENT]: [0x2E80, 0x2EFF],
  [Block.KANGXI_RADICALS]: [0x2F00, 0x2FDF],
  // 2FE0-2FEF
  [Block.IDEOGRAPHIC_DESCRIPTION_CHARACTERS]: [0x2FF0, 0x2FFF],
  [Block.CJK_SYMBOLS_AND_PUNCTUATION]: [0x3000, 0x303F],
  [Block.HIRAGANA]: [0x3040, 0x309F],
  [Block.KATAKANA]: [0x30A0, 0x30FF],
  [Block.BOPOMOFO]: [0x3100, 0x312F],
  [Block.HANGUL_COMPATIBILITY_JAMO]: [0x3130, 0x318F],
  [Block.KANBUN]: [0x3190, 0x319F],
  [Block.BOPOMOFO_EXTENDED]: [0x31A0, 0x31BF],
  [Block.CJK_STROKES]: [0x31C0, 0x31EF],
  [Block.KATAKANA_PHONETIC_EXTENSIONS]: [0x31F0, 0x31FF],
  [Block.ENCLOSED_CJK_LETTERS_AND_MONTHS]: [0x3200, 0x32FF],
  [Block.CJK_COMPATIBILITY]: [0x3300, 0x33FF],
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A]: [0x3400, 0x4DBF],
  [Block.YIJING_HEXAGRAM_SYMBOLS]: [0x4DC0, 0x4DFF],
  [Block.CJK_UNIFIED_IDEOGRAPHS]: [0x4E00, 0x9FFF],
  [Block.YI_SYLLABLES]: [0xA000, 0xA48F],
  [Block.YI_RADICALS]: [0xA490, 0xA4CF],
  [Block.LISU]: [0xA4D0, 0xA4FF],
  [Block.VAI]: [0xA500, 0xA63F],
  [Block.CYRILLIC_EXTENDED_B]: [0xA640, 0xA69F],
  [Block.BAMUM]: [0xA6A0, 0xA6FF],
  [Block.MODIFIER_TONE_LETTERS]: [0xA700, 0xA71F],
  [Block.LATIN_EXTENDED_D]: [0xA720, 0xA7FF],
  [Block.SYLOTI_NAGRI]: [0xA800, 0xA82F],
  [Block.COMMON_INDIC_NUMBER_FORMS]: [0xA830, 0xA83F],
  [Block.PHAGS_PA]: [0xA840, 0xA87F],
  [Block.SAURASHTRA]: [0xA880, 0xA8DF],
  [Block.DEVANAGARI_EXTENDED]: [0xA8E0, 0xA8FF],
  [Block.KAYAH_LI]: [0xA900, 0xA92F],
  [Block.REJANG]: [0xA930, 0xA95F],
  [Block.HANGUL_JAMO_EXTENDED_A]: [0xA960, 0xA97F],
  [Block.JAVANESE]: [0xA980, 0xA9DF],
  [Block.MYANMAR_EXTENDED_B]: [0xA9E0, 0xA9FF],
  [Block.CHAM]: [0xAA00, 0xAA5F],
  [Block.MYANMAR_EXTENDED_A]: [0xAA60, 0xAA7F],
  [Block.TAI_VIET]: [0xAA80, 0xAADF],
  [Block.MEETEI_MAYEK_EXTENSIONS]: [0xAAE0, 0xAAFF],
  [Block.ETHIOPIC_EXTENDED_A]: [0xAB00, 0xAB2F],
  [Block.LATIN_EXTENDED_E]: [0xAB30, 0xAB6F],
  [Block.CHEROKEE_SUPPLEMENT]: [0xAB70, 0xABBF],
  [Block.MEETEI_MAYEK]: [0xABC0, 0xABFF],
  [Block.HANGUL_SYLLABLES]: [0xAC00, 0xD7AF],
  [Block.HANGUL_JAMO_EXTENDED_B]: [0xD7B0, 0xD7FF],
  [Block.HIGH_SURROGATE_AREA]: [0xD800, 0xDBFF],
  [Block.LOW_SURROGATE_AREA]: [0xDC00, 0xDFFF],
  [Block.PRIVATE_USE_AREA]: [0xE000, 0xF8FF],
  [Block.CJK_COMPATIBILITY_IDEOGRAPHS]: [0xF900, 0xFAFF],
  [Block.ALPHABETIC_PRESENTATION_FORMS]: [0xFB00, 0xFB4F],
  [Block.ARABIC_PRESENTATION_FORMS_A]: [0xFB50, 0xFDFF],
  [Block.VARIATION_SELECTORS]: [0xFE00, 0xFE0F],
  [Block.VERTICAL_FORMS]: [0xFE10, 0xFE1F],
  [Block.COMBINING_HALF_MARKS]: [0xFE20, 0xFE2F],
  [Block.CJK_COMPATIBILITY_FORMS]: [0xFE30, 0xFE4F],
  [Block.SMALL_FORM_VARIANTS]: [0xFE50, 0xFE6F],
  [Block.ARABIC_PRESENTATION_FORMS_B]: [0xFE70, 0xFEFF],
  [Block.HALFWIDTH_AND_FULLWIDTH_FORMS]: [0xFF00, 0xFFEF],
  [Block.SPECIALS]: [0xFFF0, 0xFFFF],
  [Block.LINEAR_B_SYLLABARY]: [0x10000, 0x1007F],
  [Block.LINEAR_B_IDEOGRAMS]: [0x10080, 0x100FF],
  [Block.AEGEAN_NUMBERS]: [0x10100, 0x1013F],
  [Block.ANCIENT_GREEK_NUMBERS]: [0x10140, 0x1018F],
  [Block.ANCIENT_SYMBOLS]: [0x10190, 0x101CF],
  [Block.PHAISTOS_DISC]: [0x101D0, 0x101FF],
  // 10200-1027F
  [Block.LYCIAN]: [0x10280, 0x1029F],
  [Block.CARIAN]: [0x102A0, 0x102DF],
  [Block.COPTIC_EPACT_NUMBERS]: [0x102E0, 0x102FF],
  [Block.OLD_ITALIC]: [0x10300, 0x1032F],
  [Block.GOTHIC]: [0x10330, 0x1034F],
  [Block.OLD_PERMIC]: [0x10350, 0x1037F],
  [Block.UGARITIC]: [0x10380, 0x1039F],
  [Block.OLD_PERSIAN]: [0x103A0, 0x103DF],
  // 103E0-103FF
  [Block.DESERET]: [0x10400, 0x1044F],
  [Block.SHAVIAN]: [0x10450, 0x1047F],
  [Block.OSMANYA]: [0x10480, 0x104AF],
  [Block.OSAGE]: [0x104B0, 0x104FF],
  [Block.ELBASAN]: [0x10500, 0x1052F],
  [Block.CAUCASIAN_ALBANIAN]: [0x10530, 0x1056F],
  [Block.VITHKUQI]: [0x10570, 0x105BF],
  // 105C0-105FF
  [Block.LINEAR_A]: [0x10600, 0x1077F],
  [Block.LATIN_EXTENDED_F]: [0x10780, 0x107BF],
  // 107C0-107FF
  [Block.CYPRIOT_SYLLABARY]: [0x10800, 0x1083F],
  [Block.IMPERIAL_ARAMAIC]: [0x10840, 0x1085F],
  [Block.PALMYRENE]: [0x10860, 0x1087F],
  [Block.NABATAEAN]: [0x10880, 0x108AF],
  // 108B0-108DF
  [Block.HATRAN]: [0x108E0, 0x108FF],
  [Block.PHOENICIAN]: [0x10900, 0x1091F],
  [Block.LYDIAN]: [0x10920, 0x1093F],
  // 10940-1097F
  [Block.MEROITIC_HIEROGLYPHS]: [0x10980, 0x1099F],
  [Block.MEROITIC_CURSIVE]: [0x109A0, 0x109FF],
  [Block.KHAROSHTHI]: [0x10A00, 0x10A5F],
  [Block.OLD_SOUTH_ARABIAN]: [0x10A60, 0x10A7F],
  [Block.OLD_NORTH_ARABIAN]: [0x10A80, 0x10A9F],
  // 10AA0-10ABF
  [Block.MANICHAEAN]: [0x10AC0, 0x10AFF],
  [Block.AVESTAN]: [0x10B00, 0x10B3F],
  [Block.INSCRIPTIONAL_PARTHIAN]: [0x10B40, 0x10B5F],
  [Block.INSCRIPTIONAL_PAHLAVI]: [0x10B60, 0x10B7F],
  [Block.PSALTER_PAHLAVI]: [0x10B80, 0x10BAF],
  // 10BB0-10BFF
  [Block.OLD_TURKIC]: [0x10C00, 0x10C4F],
  // 10C50-10C7F
  [Block.OLD_HUNGARIAN]: [0x10C80, 0x10CFF],
  [Block.HANIFI_ROHINGYA]: [0x10D00, 0x10D3F],
  // 10D40-10E5F
  [Block.RUMI_NUMERAL_SYMBOLS]: [0x10E60, 0x10E7F],
  [Block.YEZIDI]: [0x10E80, 0x10EBF],
  [Block.ARABIC_EXTENDED_C]: [0x10EC0, 0x10EFF],
  [Block.OLD_SOGDIAN]: [0x10F00, 0x10F2F],
  [Block.SOGDIAN]: [0x10F30, 0x10F6F],
  [Block.OLD_UYGHUR]: [0x10F70, 0x10FAF],
  [Block.CHORASMIAN]: [0x10FB0, 0x10FDF],
  [Block.ELYMAIC]: [0x10FE0, 0x10FFF],
  [Block.BRAHMI]: [0x11000, 0x1107F],
  [Block.KAITHI]: [0x11080, 0x110CF],
  [Block.SORA_SOMPENG]: [0x110D0, 0x110FF],
  [Block.CHAKMA]: [0x11100, 0x1114F],
  [Block.MAHAJANI]: [0x11150, 0x1117F],
  [Block.SHARADA]: [0x11180, 0x111DF],
  [Block.SINHALA_ARCHAIC_NUMBERS]: [0x111E0, 0x111FF],
  [Block.KHOJKI]: [0x11200, 0x1124F],
  // 11250-1127F
  [Block.MULTANI]: [0x11280, 0x112AF],
  [Block.KHUDAWADI]: [0x112B0, 0x112FF],
  [Block.GRANTHA]: [0x11300, 0x1137F],
  // 11380-113FF
  [Block.NEWA]: [0x11400, 0x1147F],
  [Block.TIRHUTA]: [0x11480, 0x114DF],
  // 114E0-1157F
  [Block.SIDDHAM]: [0x11580, 0x115FF],
  [Block.MODI]: [0x11600, 0x1165F],
  [Block.MONGOLIAN_SUPPLEMENT]: [0x11660, 0x1167F],
  [Block.TAKRI]: [0x11680, 0x116CF],
  // 116D0-116FF
  [Block.AHOM]: [0x11700, 0x1174F],
  // 11750-117FF
  [Block.DOGRA]: [0x11800, 0x1184F],
  // 11850-1189F
  [Block.WARANG_CITI]: [0x118A0, 0x118FF],
  [Block.DIVES_AKURU]: [0x11900, 0x1195F],
  // 11960-1199F
  [Block.NANDINAGARI]: [0x119A0, 0x119FF],
  [Block.ZANABAZAR_SQUARE]: [0x11A00, 0x11A4F],
  [Block.SOYOMBO]: [0x11A50, 0x11AAF],
  [Block.UNIFIED_CANADIAN_ABORIGINAL_SYLLABICS_EXTENDED_A]: [
    0x11AB0,
    0x11ABF,
  ],
  [Block.PAU_CIN_HAU]: [0x11AC0, 0x11AFF],
  [Block.DEVANAGARI_EXTENDED_A]: [0x11B00, 0x11B5F],
  // 11B60-11BFF
  [Block.BHAIKSUKI]: [0x11C00, 0x11C6F],
  [Block.MARCHEN]: [0x11C70, 0x11CBF],
  // 11CC0-11CFF
  [Block.MASARAM_GONDI]: [0x11D00, 0x11D5F],
  [Block.GUNJALA_GONDI]: [0x11D60, 0x11DAF],
  // 11DB0-11EDF
  [Block.MAKASAR]: [0x11EE0, 0x11EFF],
  [Block.KAWI]: [0x11F00, 0x11F5F],
  // 11F60-11FAF
  [Block.LISU_SUPPLEMENT]: [0x11FB0, 0x11FBF],
  [Block.TAMIL_SUPPLEMENT]: [0x11FC0, 0x11FFF],
  [Block.CUNEIFORM]: [0x12000, 0x123FF],
  [Block.CUNEIFORM_NUMBERS_AND_PUNCTUATION]: [0x12400, 0x1247F],
  [Block.EARLY_DYNASTIC_CUNEIFORM]: [0x12480, 0x1254F],
  // 12550-12F8F
  [Block.CYPRO_MINOAN]: [0x12F90, 0x12FFF],
  [Block.EGYPTIAN_HIEROGLYPHS]: [0x13000, 0x1342F],
  [Block.EGYPTIAN_HIEROGLYPH_FORMAT_CONTROLS]: [0x13430, 0x1345F],
  // 13460-143FF
  [Block.ANATOLIAN_HIEROGLYPHS]: [0x14400, 0x1467F],
  // 14680-167FF
  [Block.BAMUM_SUPPLEMENT]: [0x16800, 0x16A3F],
  [Block.MRO]: [0x16A40, 0x16A6F],
  [Block.TANGSA]: [0x16A70, 0x16ACF],
  [Block.BASSA_VAH]: [0x16AD0, 0x16AFF],
  [Block.PAHAWH_HMONG]: [0x16B00, 0x16B8F],
  // 16B90-16E3F
  [Block.MEDEFAIDRIN]: [0x16E40, 0x16E9F],
  // 16EA0-16EFF
  [Block.MIAO]: [0x16F00, 0x16F9F],
  // 16FA0-16FDF
  [Block.IDEOGRAPHIC_SYMBOLS_AND_PUNCTUATION]: [0x16FE0, 0x16FFF],
  [Block.TANGUT]: [0x17000, 0x187FF], // チャートのpdfでは Range:17000-187F7 となってる（ブロック末尾の未割当コードを除いてるっぽい）
  [Block.TANGUT_COMPONENTS]: [0x18800, 0x18AFF],
  [Block.KHITAN_SMALL_SCRIPT]: [0x18B00, 0x18CFF],
  [Block.TANGUT_SUPPLEMENT]: [0x18D00, 0x18D7F], // チャートのpdfでは Range:18D00-18D08 となってる（ブロック末尾の未割当コードを省いてるっぽい）
  // 18D80-1AFEF
  [Block.KANA_EXTENDED_B]: [0x1AFF0, 0x1AFFF],
  [Block.KANA_SUPPLEMENT]: [0x1B000, 0x1B0FF],
  [Block.KANA_EXTENDED_A]: [0x1B100, 0x1B12F],
  [Block.SMALL_KANA_EXTENSION]: [0x1B130, 0x1B16F],
  [Block.NUSHU]: [0x1B170, 0x1B2FF],
  // 1B300-1BBFF
  [Block.DUPLOYAN]: [0x1BC00, 0x1BC9F],
  [Block.SHORTHAND_FORMAT_CONTROLS]: [0x1BCA0, 0x1BCAF],
  // 1BCB0-1CEFF
  [Block.ZNAMENNY_MUSICAL_NOTATION]: [0x1CF00, 0x1CFCF],
  // 1CFD0-1CFFF
  [Block.BYZANTINE_MUSICAL_SYMBOLS]: [0x1D000, 0x1D0FF],
  [Block.MUSICAL_SYMBOLS]: [0x1D100, 0x1D1FF],
  [Block.ANCIENT_GREEK_MUSICAL_NOTATION]: [0x1D200, 0x1D24F],
  // 1D250-1D2BF
  [Block.KAKTOVIK_NUMERALS]: [0x1D2C0, 0x1D2DF],
  [Block.MAYAN_NUMERALS]: [0x1D2E0, 0x1D2FF],
  [Block.TAI_XUAN_JING_SYMBOLS]: [0x1D300, 0x1D35F],
  [Block.COUNTING_ROD_NUMERALS]: [0x1D360, 0x1D37F],
  // 1D380-1D3FF
  [Block.MATHEMATICAL_ALPHANUMERIC_SYMBOLS]: [0x1D400, 0x1D7FF],
  [Block.SUTTON_SIGN_WRITING]: [0x1D800, 0x1DAAF],
  // 1DAB0-1DEFF
  [Block.LATIN_EXTENDED_G]: [0x1DF00, 0x1DFFF],
  [Block.GLAGOLITIC_SUPPLEMENT]: [0x1E000, 0x1E02F],
  [Block.CYRILLIC_EXTENDED_D]: [0x1E030, 0x1E08F],
  // 1E090-1E0FF
  [Block.NYIAKENG_PUACHUE_HMONG]: [0x1E100, 0x1E14F],
  // 1E150-1E28F
  [Block.TOTO]: [0x1E290, 0x1E2BF],
  [Block.WANCHO]: [0x1E2C0, 0x1E2FF],
  // 1E300-1E4CF
  [Block.NAG_MUNDARI]: [0x1E4D0, 0x1E4FF],
  // 1E500-1E7DF
  [Block.ETHIOPIC_EXTENDED_B]: [0x1E7E0, 0x1E7FF],
  [Block.MENDE_KIKAKUI]: [0x1E800, 0x1E8DF],
  // 1E8E0-1E8FF
  [Block.ADLAM]: [0x1E900, 0x1E95F],
  // 1E960-1EC6F
  [Block.INDIC_SIYAQ_NUMBERS]: [0x1EC70, 0x1ECBF],
  // 1ECC0-1ECFF
  [Block.OTTOMAN_SIYAQ_NUMBERS]: [0x1ED00, 0x1ED4F],
  // 1ED50-1EDFF
  [Block.ARABIC_MATHEMATICAL_ALPHABETIC_SYMBOLS]: [0x1EE00, 0x1EEFF],
  // 1EF00-1FEFF
  [Block.MAHJONG_TILES]: [0x1F000, 0x1F02F],
  [Block.DOMINO_TILES]: [0x1F030, 0x1F09F],
  [Block.PLAYING_CARDS]: [0x1F0A0, 0x1F0FF],
  [Block.ENCLOSED_ALPHANUMERIC_SUPPLEMENT]: [0x1F100, 0x1F1FF],
  [Block.ENCLOSED_IDEOGRAPHIC_SUPPLEMENT]: [0x1F200, 0x1F2FF],
  [Block.MISCELLANEOUS_SYMBOLS_AND_PICTOGRAPHS]: [0x1F300, 0x1F5FF],
  [Block.EMOTICONS]: [0x1F600, 0x1F64F],
  [Block.ORNAMENTAL_DINGBATS]: [0x1F650, 0x1F67F],
  [Block.TRANSPORT_AND_MAP_SYMBOLS]: [0x1F680, 0x1F6FF],
  [Block.ALCHEMICAL_SYMBOLS]: [0x1F700, 0x1F77F],
  [Block.GEOMETRIC_SHAPES_EXTENDED]: [0x1F780, 0x1F7FF],
  [Block.SUPPLEMENTAL_ARROWS_C]: [0x1F800, 0x1F8FF],
  [Block.SUPPLEMENTAL_SYMBOLS_AND_PICTOGRAPHS]: [0x1F900, 0x1F9FF],
  [Block.CHESS_SYMBOLS]: [0x1FA00, 0x1FA6F],
  [Block.SYMBOLS_AND_PICTOGRAPHS_EXTENDED_A]: [0x1FA70, 0x1FAFF],
  [Block.SYMBOLS_FOR_LEGACY_COMPUTING]: [0x1FB00, 0x1FBFF],
  // 1FC00-1FFFF
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B]: [0x20000, 0x2A6DF],
  // 2A6E0-2A6FF
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_C]: [0x2A700, 0x2B73F], // チャートのpdfでは Range:2A700-2B739 となってる（ブロック末尾の未割当コードを除いてるっぽい）
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_D]: [0x2B740, 0x2B81F], // チャートのpdfでは Range:2B740-2B81D となってる（ブロック末尾の未割当コードを除いてるっぽい）
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_E]: [0x2B820, 0x2CEAF], // チャートのpdfでは Range:2B820-2CEA1 となってる（ブロック末尾の未割当コードを除いてるっぽい）
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_F]: [0x2CEB0, 0x2EBEF], // チャートのpdfでは Range:2CEB0-2EBE0 となってる（ブロック末尾の未割当コードを除いてるっぽい）
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_I]: [0x2EBF0, 0x2EE5F], // チャートのpdfでは Range:2EBF0-2EE5D となってる（ブロック末尾の未割当コードを除いてるっぽい）
  // 2EE60-2F7FF
  [Block.CJK_COMPATIBILITY_IDEOGRAPHS_SUPPLEMENT]: [0x2F800, 0x2FA1F],
  // 2FA20-2FFFF
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_G]: [0x30000, 0x3134F], // チャートのpdfでは Range:30000-3134A となってる（ブロック末尾の未割当コードを除いてるっぽい）
  [Block.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_H]: [0x31350, 0x323AF],
  // 323B0-DFF7F
  // [Block.UNASSIGNED]: [0xDFF80, 0xDFFFF],
  [Block.TAGS]: [0xE0000, 0xE007F],
  // E0080-E00FF
  [Block.VARIATION_SELECTORS_SUPPLEMENT]: [0xE0100, 0xE01EF],
  // E01F0-EFF7F
  // [Block.UNASSIGNED]: [0xEFF80, 0EFFFF],
  [Block.SUPPLEMENTARY_PRIVATE_USE_AREA_A]: [0xF0000, 0xFFFFF],
  [Block.SUPPLEMENTARY_PRIVATE_USE_AREA_B]: [0x100000, 0x10FFFF], // 10FFFE,10FFFFのみ非文字
} as const;

// 事実上定義できないのでnumberの別名とする
export type CodePoint = number;

export namespace CodePoint {
  export type Plane =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16;

  export const MIN_VALUE = 0x0;

  export const MAX_VALUE = 0x10FFFF;

  export function isCodePoint(test: unknown): test is CodePoint {
    return Number.isSafeInteger(test) &&
      NumberEx.inRange(test as number, [MIN_VALUE, MAX_VALUE]);
  }

  export function toString(codePoint: CodePoint): string {
    if (isCodePoint(codePoint)) {
      return `U+${codePoint.toString(16).toUpperCase().padStart(4, "0")}`;
    }
    throw new TypeError("codePoint");
  }

  // export function blockOf() {
  //   Object.getOwnPropertySymbols(_BlockRange);
  // }

  export function inBlock(test: unknown, block: Block): boolean {
    const range = _BlockRange[block];
    if (!range) {
      throw new TypeError("block");
    }

    if (isCodePoint(test) !== true) {
      return false;
    }

    return NumberEx.inRange(test as number, range);
  }

  export function inBlocks(test: unknown, blocks: Iterable<Block>): boolean {
    for (const block of blocks) {
      if (!_BlockRange[block]) {
        throw new TypeError("block");
      }
    }

    if (isCodePoint(test) !== true) {
      return false;
    }

    for (const block of blocks) {
      if (NumberEx.inRange(test as number, _BlockRange[block])) {
        return true;
      }
    }
    return false;
  }

  export function isHighSurrogate(test: unknown): boolean {
    return inBlock(test, Block.HIGH_SURROGATE_AREA);
  }

  export function isLowSurrogate(test: unknown): boolean {
    return inBlock(test, Block.LOW_SURROGATE_AREA);
  }

  export function isSurrogate(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }

    return inBlocks(test as number, [
      Block.HIGH_SURROGATE_AREA,
      Block.LOW_SURROGATE_AREA,
    ]);
  }

  export function planeOf(codePoint: CodePoint): Plane {
    if (isCodePoint(codePoint) !== true) {
      throw new TypeError("codePoint");
    }
    return Math.trunc(codePoint / 0x10000) as Plane;
  }

  export function inPlane(test: unknown, plane: Plane): boolean {
    if (_isPlane(plane) !== true) {
      throw new TypeError("plane");
    }

    if (isCodePoint(test) !== true) {
      return false;
    }

    return (planeOf(test) === plane);
  }

  export function isBmp(test: unknown): boolean {
    if (isCodePoint(test) !== true) {
      return false;
    }
    return inPlane(test, 0);
  }
}
