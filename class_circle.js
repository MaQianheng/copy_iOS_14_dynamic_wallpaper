function generateRandomIntegerNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Circle {
    constructor(domContainer, objUserConfig = {}) {
        this.domContainer = domContainer
        this.objAppConfig = {
            numMaxObjectCount: 35,
            numWakingObjectCount: 0,
            numNextCheckInterval: generateRandomIntegerNumber(3 * 1000, 10 * 1000),
            numCircleMinRadiusTimes: 0.05,
            numCircleMaxRadiusTimes: 0.2,
            arrHidingDomId: [],
            arrShowingDomId: [],
            // 0: hide, 1: show
            objObjectStatus: {}
        }
        this.checkObjConfig(objUserConfig)
        this.updateHypotenuse()
    }
}

Circle.prototype.checkObjConfig = function (objUserConfig) {
    Object.keys(objUserConfig).forEach((strKey) => {
        this.objAppConfig[strKey] = objUserConfig[strKey]
    })
}

Circle.prototype.updateHypotenuse = function () {
    const containerWidth = this.domContainer.offsetWidth
    const containerHeight = this.domContainer.offsetHeight
    this.hypotenuse = Math.floor(Math.sqrt(Math.pow(parseInt(containerWidth), 2) + Math.pow(parseInt(containerHeight), 2)))
}

Circle.prototype.debounceUpdateSize = function () {
    let timeOut = null
    return () => {
        if (timeOut !== null) clearTimeout(timeOut)
        timeOut = setTimeout(() => {
            timeOut = null
            clearTimeout(timeOut)
            this.updateHypotenuse()
        }, 1000)
    }
}

Circle.prototype.generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
}

Circle.prototype.generateRandomRadius = function () {
    return generateRandomIntegerNumber(this.hypotenuse * this.objAppConfig.numCircleMinRadiusTimes, this.hypotenuse * this.objAppConfig.numCircleMaxRadiusTimes)
}

Circle.prototype.generateRandomDepth = function () {
    return generateRandomIntegerNumber(1, 5)
}

Circle.prototype.generateRandomOpacity = function (numDepth) {
    const numMin = 100 - (numDepth * 2) * 10
    return [generateRandomIntegerNumber(numMin, numMin + 20) / 100, generateRandomIntegerNumber(numMin, numMin + 20) / 100]
}

Circle.prototype.generateRandomBlur = function (numDepth) {
    const numMin = numDepth * 10 - 10
    return [generateRandomIntegerNumber(numMin, numMin + 10) / 10, generateRandomIntegerNumber(numMin, numMin + 10) / 10]
}

// return '(rgb(189, 195, 199), rgb(44, 62, 80))'
Circle.prototype.generateRandomBGC = function () {
    const arrBGC = ['rgb(189, 195, 199), rgb(44, 62, 80)', 'rgb(238, 156, 167), rgb(255, 221, 225)', 'rgb(33, 147, 176), rgb(109, 213, 237)', 'rgb(198, 255, 221), rgb(251, 215, 134), rgb(247, 121, 125)', 'rgb(15, 32, 39), rgb(32, 58, 67), rgb(44, 83, 100)', 'rgb(18, 194, 233), rgb(196, 113, 237), rgb(246, 79, 89)', 'rgb(185, 43, 39), rgb(21, 101, 192)', 'rgb(55, 59, 68), rgb(66, 134, 244)', 'rgb(41, 128, 185), rgb(109, 213, 250), rgb(255, 255, 255)', 'rgb(255, 0, 153), rgb(73, 50, 64)', 'rgb(170, 75, 107), rgb(107, 107, 131), rgb(59, 141, 153)', 'rgb(142, 45, 226), rgb(74, 0, 224)', 'rgb(31, 64, 55), rgb(153, 242, 200)', 'rgb(249, 83, 198), rgb(185, 29, 115)', 'rgb(127, 127, 213), rgb(134, 168, 231), rgb(145, 234, 228)', 'rgb(195, 20, 50), rgb(36, 11, 54)', 'rgb(241, 39, 17), rgb(245, 175, 25)', 'rgb(101, 153, 153), rgb(244, 121, 31)', 'rgb(221, 62, 84), rgb(107, 229, 133)', 'rgb(131, 96, 195), rgb(46, 191, 145)', 'rgb(84, 74, 125), rgb(255, 212, 82)', 'rgb(0, 159, 255), rgb(236, 47, 75)', 'rgb(101, 78, 163), rgb(234, 175, 200)', 'rgb(255, 65, 108), rgb(255, 75, 43)', 'rgb(138, 35, 135), rgb(233, 64, 87), rgb(242, 113, 33)', 'rgb(168, 255, 120), rgb(120, 255, 214)', 'rgb(30, 150, 0), rgb(255, 242, 0), rgb(255, 0, 0)', 'rgb(237, 33, 58), rgb(147, 41, 30)', 'rgb(253, 200, 48), rgb(243, 115, 53)', 'rgb(0, 180, 219), rgb(0, 131, 176)', 'rgb(255, 239, 186), rgb(255, 255, 255)', 'rgb(89, 193, 115), rgb(161, 127, 224), rgb(93, 38, 193)', 'rgb(0, 90, 167), rgb(255, 253, 228)', 'rgb(218, 68, 83), rgb(137, 33, 107)', 'rgb(99, 99, 99), rgb(162, 171, 88)', 'rgb(173, 83, 137), rgb(60, 16, 83)', 'rgb(168, 192, 255), rgb(63, 43, 150)', 'rgb(51, 51, 51), rgb(221, 24, 24)', 'rgb(78, 84, 200), rgb(143, 148, 251)', 'rgb(53, 92, 125), rgb(108, 91, 123), rgb(192, 108, 132)', 'rgb(188, 78, 156), rgb(248, 7, 89)', 'rgb(64, 224, 208), rgb(255, 140, 0), rgb(255, 0, 128)', 'rgb(62, 81, 81), rgb(222, 203, 164)', 'rgb(17, 153, 142), rgb(56, 239, 125)', 'rgb(16, 141, 199), rgb(239, 142, 56)', 'rgb(252, 92, 125), rgb(106, 130, 251)', 'rgb(252, 70, 107), rgb(63, 94, 251)', 'rgb(201, 75, 75), rgb(75, 19, 79)', 'rgb(35, 7, 77), rgb(204, 83, 51)', 'rgb(255, 251, 213), rgb(178, 10, 44)', 'rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62)', 'rgb(0, 176, 155), rgb(150, 201, 61)', 'rgb(211, 204, 227), rgb(233, 228, 240)', 'rgb(60, 59, 63), rgb(96, 92, 60)', 'rgb(202, 197, 49), rgb(243, 249, 167)', 'rgb(128, 0, 128), rgb(255, 192, 203)', 'rgb(0, 242, 96), rgb(5, 117, 230)', 'rgb(252, 74, 26), rgb(247, 183, 51)', 'rgb(116, 235, 213), rgb(172, 182, 229)', 'rgb(109, 96, 39), rgb(211, 203, 184)', 'rgb(3, 0, 30), rgb(115, 3, 192), rgb(236, 56, 188), rgb(253, 239, 249)', 'rgb(102, 125, 182), rgb(0, 130, 200), rgb(0, 130, 200), rgb(102, 125, 182)', 'rgb(173, 169, 150), rgb(242, 242, 242), rgb(219, 219, 219), rgb(234, 234, 234)', 'rgb(225, 238, 195), rgb(240, 80, 83)', 'rgb(26, 42, 108), rgb(178, 31, 31), rgb(253, 187, 45)', 'rgb(34, 193, 195), rgb(253, 187, 45)', 'rgb(255, 153, 102), rgb(255, 94, 98)', 'rgb(127, 0, 255), rgb(225, 0, 255)', 'rgb(201, 214, 255), rgb(226, 226, 226)', 'rgb(57, 106, 252), rgb(41, 72, 255)', 'rgb(217, 167, 199), rgb(255, 252, 220)', 'rgb(12, 235, 235), rgb(32, 227, 178), rgb(41, 255, 198)', 'rgb(6, 190, 182), rgb(72, 177, 191)', 'rgb(100, 43, 115), rgb(198, 66, 110)', 'rgb(28, 146, 210), rgb(242, 252, 254)', 'rgb(0, 0, 0), rgb(15, 155, 15)', 'rgb(54, 209, 220), rgb(91, 134, 229)', 'rgb(203, 53, 107), rgb(189, 63, 50)', 'rgb(58, 28, 113), rgb(215, 109, 119), rgb(255, 175, 123)', 'rgb(40, 60, 134), rgb(69, 162, 71)', 'rgb(239, 59, 54), rgb(255, 255, 255)', 'rgb(192, 57, 43), rgb(142, 68, 173)', 'rgb(21, 153, 87), rgb(21, 87, 153)', 'rgb(0, 0, 70), rgb(28, 181, 224)', 'rgb(0, 121, 145), rgb(120, 255, 214)', 'rgb(86, 204, 242), rgb(47, 128, 237)', 'rgb(242, 153, 74), rgb(242, 201, 76)', 'rgb(235, 87, 87), rgb(0, 0, 0)', 'rgb(228, 77, 38), rgb(241, 101, 41)', 'rgb(74, 194, 154), rgb(189, 255, 243)', 'rgb(178, 254, 250), rgb(14, 210, 247)', 'rgb(48, 232, 191), rgb(255, 130, 53)', 'rgb(214, 109, 117), rgb(226, 149, 135)', 'rgb(32, 0, 44), rgb(203, 180, 212)', 'rgb(195, 55, 100), rgb(29, 38, 113)', 'rgb(247, 151, 30), rgb(255, 210, 0)', 'rgb(52, 232, 158), rgb(15, 52, 67)', 'rgb(97, 144, 232), rgb(167, 191, 232)', 'rgb(68, 160, 141), rgb(9, 54, 55)', 'rgb(32, 1, 34), rgb(111, 0, 0)', 'rgb(5, 117, 230), rgb(2, 27, 121)', 'rgb(69, 104, 220), rgb(176, 106, 179)', 'rgb(67, 198, 172), rgb(25, 22, 84)', 'rgb(9, 48, 40), rgb(35, 122, 87)', 'rgb(67, 198, 172), rgb(248, 255, 174)', 'rgb(255, 175, 189), rgb(255, 195, 160)', 'rgb(240, 242, 240), rgb(0, 12, 64)', 'rgb(232, 203, 192), rgb(99, 111, 164)', 'rgb(220, 227, 91), rgb(69, 182, 73)', 'rgb(192, 192, 170), rgb(28, 239, 255)', 'rgb(156, 236, 251), rgb(101, 199, 247), rgb(0, 82, 212)', 'rgb(219, 230, 246), rgb(197, 121, 109)', 'rgb(52, 148, 230), rgb(236, 110, 173)', 'rgb(103, 178, 111), rgb(76, 162, 205)', 'rgb(243, 144, 79), rgb(59, 67, 113)', 'rgb(238, 9, 121), rgb(255, 106, 0)', 'rgb(167, 112, 239), rgb(207, 139, 243), rgb(253, 185, 155)', 'rgb(65, 41, 90), rgb(47, 7, 67)', 'rgb(244, 196, 243), rgb(252, 103, 250)', 'rgb(0, 195, 255), rgb(255, 255, 28)', 'rgb(255, 126, 95), rgb(254, 180, 123)', 'rgb(255, 252, 0), rgb(255, 255, 255)', 'rgb(255, 0, 204), rgb(51, 51, 153)', 'rgb(222, 97, 97), rgb(38, 87, 235)', 'rgb(239, 50, 217), rgb(137, 255, 253)', 'rgb(58, 97, 134), rgb(137, 37, 62)', 'rgb(78, 205, 196), rgb(85, 98, 112)', 'rgb(161, 255, 206), rgb(250, 255, 209)', 'rgb(190, 147, 197), rgb(123, 198, 204)', 'rgb(189, 195, 199), rgb(44, 62, 80)', 'rgb(255, 216, 155), rgb(25, 84, 123)', 'rgb(128, 128, 128), rgb(63, 173, 168)', 'rgb(252, 234, 187), rgb(248, 181, 0)', 'rgb(248, 80, 50), rgb(231, 56, 39)', 'rgb(247, 157, 0), rgb(100, 243, 140)', 'rgb(203, 45, 62), rgb(239, 71, 58)', 'rgb(86, 171, 47), rgb(168, 224, 99)', 'rgb(0, 4, 40), rgb(0, 78, 146)', 'rgb(66, 39, 90), rgb(115, 75, 109)', 'rgb(20, 30, 48), rgb(36, 59, 85)', 'rgb(240, 0, 0), rgb(220, 40, 30)', 'rgb(44, 62, 80), rgb(253, 116, 108)', 'rgb(44, 62, 80), rgb(76, 161, 175)', 'rgb(233, 100, 67), rgb(144, 78, 149)', 'rgb(11, 72, 107), rgb(245, 98, 23)', 'rgb(58, 123, 213), rgb(58, 96, 115)', 'rgb(0, 210, 255), rgb(146, 141, 171)', 'rgb(33, 150, 243), rgb(244, 67, 54)', 'rgb(255, 95, 109), rgb(255, 195, 113)', 'rgb(255, 75, 31), rgb(255, 144, 104)', 'rgb(22, 191, 253), rgb(203, 48, 102)', 'rgb(238, 205, 163), rgb(239, 98, 159)', 'rgb(29, 67, 80), rgb(164, 57, 49)', 'rgb(168, 0, 119), rgb(102, 255, 0)', 'rgb(247, 255, 0), rgb(219, 54, 164)', 'rgb(255, 75, 31), rgb(31, 221, 255)', 'rgb(186, 83, 112), rgb(244, 226, 216)', 'rgb(224, 234, 252), rgb(207, 222, 243)', 'rgb(76, 161, 175), rgb(196, 224, 229)', 'rgb(0, 0, 0), rgb(67, 67, 67)', 'rgb(75, 121, 161), rgb(40, 62, 81)', 'rgb(131, 77, 155), rgb(208, 78, 214)', 'rgb(0, 153, 247), rgb(241, 23, 18)', 'rgb(41, 128, 185), rgb(44, 62, 80)', 'rgb(90, 63, 55), rgb(44, 119, 68)', 'rgb(77, 160, 176), rgb(211, 157, 56)', 'rgb(86, 20, 176), rgb(219, 214, 92)', 'rgb(47, 115, 54), rgb(170, 58, 56)', 'rgb(30, 60, 114), rgb(42, 82, 152)', 'rgb(17, 67, 87), rgb(242, 148, 146)', 'rgb(253, 116, 108), rgb(255, 144, 104)', 'rgb(234, 205, 163), rgb(214, 174, 123)', 'rgb(106, 48, 147), rgb(160, 68, 255)', 'rgb(69, 127, 202), rgb(86, 145, 200)', 'rgb(178, 69, 146), rgb(241, 95, 121)', 'rgb(192, 36, 37), rgb(240, 203, 53)', 'rgb(64, 58, 62), rgb(190, 88, 105)', 'rgb(194, 229, 156), rgb(100, 179, 244)', 'rgb(255, 183, 94), rgb(237, 143, 3)', 'rgb(142, 14, 0), rgb(31, 28, 24)', 'rgb(118, 184, 82), rgb(141, 194, 111)', 'rgb(103, 58, 183), rgb(81, 45, 168)', 'rgb(0, 201, 255), rgb(146, 254, 157)', 'rgb(244, 107, 69), rgb(238, 168, 73)', 'rgb(0, 92, 151), rgb(54, 55, 149)', 'rgb(229, 57, 53), rgb(227, 93, 91)', 'rgb(252, 0, 255), rgb(0, 219, 222)', 'rgb(44, 62, 80), rgb(52, 152, 219)', 'rgb(204, 204, 178), rgb(117, 117, 25)', 'rgb(48, 67, 82), rgb(215, 210, 204)', 'rgb(238, 156, 167), rgb(255, 221, 225)', 'rgb(186, 139, 2), rgb(24, 24, 24)', 'rgb(82, 82, 82), rgb(61, 114, 180)', 'rgb(0, 79, 249), rgb(255, 249, 76)', 'rgb(106, 145, 19), rgb(20, 21, 23)', 'rgb(241, 242, 181), rgb(19, 80, 88)', 'rgb(209, 145, 60), rgb(255, 209, 148)', 'rgb(123, 67, 151), rgb(220, 36, 48)', 'rgb(142, 158, 171), rgb(238, 242, 243)', 'rgb(19, 106, 138), rgb(38, 120, 113)', 'rgb(0, 191, 143), rgb(0, 21, 16)', 'rgb(255, 0, 132), rgb(51, 0, 27)', 'rgb(131, 58, 180), rgb(253, 29, 29), rgb(252, 176, 69)', 'rgb(254, 172, 94), rgb(199, 121, 208), rgb(75, 192, 200)', 'rgb(100, 65, 165), rgb(42, 8, 69)', 'rgb(255, 179, 71), rgb(255, 204, 51)', 'rgb(67, 206, 162), rgb(24, 90, 157)', 'rgb(255, 161, 127), rgb(0, 34, 62)', 'rgb(54, 0, 51), rgb(11, 135, 147)', 'rgb(30, 19, 12), rgb(154, 132, 120)', 'rgb(211, 131, 18), rgb(168, 50, 121)', 'rgb(115, 200, 169), rgb(55, 59, 68)', 'rgb(171, 186, 171), rgb(255, 255, 255)', 'rgb(253, 252, 71), rgb(36, 254, 65)', 'rgb(131, 164, 212), rgb(182, 251, 255)', 'rgb(72, 85, 99), rgb(41, 50, 60)', 'rgb(82, 194, 52), rgb(6, 23, 0)', 'rgb(254, 140, 0), rgb(248, 54, 0)', 'rgb(0, 198, 255), rgb(0, 114, 255)', 'rgb(112, 225, 245), rgb(255, 209, 148)', 'rgb(85, 98, 112), rgb(255, 107, 107)', 'rgb(157, 80, 187), rgb(110, 72, 170)', 'rgb(120, 2, 6), rgb(6, 17, 97)', 'rgb(179, 255, 171), rgb(18, 255, 247)', 'rgb(170, 255, 169), rgb(17, 255, 189)', 'rgb(0, 0, 0), rgb(231, 76, 60)', 'rgb(240, 194, 123), rgb(75, 18, 72)', 'rgb(255, 78, 80), rgb(249, 212, 35)', 'rgb(173, 209, 0), rgb(123, 146, 10)', 'rgb(251, 211, 233), rgb(187, 55, 125)', 'rgb(96, 108, 136), rgb(63, 76, 107)', 'rgb(201, 255, 191), rgb(255, 175, 189)', 'rgb(100, 145, 115), rgb(219, 213, 164)', 'rgb(185, 147, 214), rgb(140, 166, 219)', 'rgb(135, 0, 0), rgb(25, 10, 5)', 'rgb(0, 210, 255), rgb(58, 123, 213)', 'rgb(211, 149, 155), rgb(191, 230, 186)', 'rgb(218, 210, 153), rgb(176, 218, 185)', 'rgb(242, 112, 156), rgb(255, 148, 114)', 'rgb(230, 218, 218), rgb(39, 64, 70)', 'rgb(93, 65, 87), rgb(168, 202, 186)', 'rgb(221, 214, 243), rgb(250, 172, 168)', 'rgb(97, 97, 97), rgb(155, 197, 195)', 'rgb(80, 201, 195), rgb(150, 222, 218)', 'rgb(33, 95, 0), rgb(228, 228, 217)', 'rgb(194, 21, 0), rgb(255, 197, 0)', 'rgb(239, 239, 187), rgb(212, 211, 221)', 'rgb(255, 238, 238), rgb(221, 239, 187)', 'rgb(102, 102, 0), rgb(153, 153, 102)', 'rgb(222, 98, 98), rgb(255, 184, 140)', 'rgb(233, 211, 98), rgb(51, 51, 51)', 'rgb(213, 51, 105), rgb(203, 173, 109)', 'rgb(167, 55, 55), rgb(122, 40, 40)', 'rgb(248, 87, 166), rgb(255, 88, 88)', 'rgb(75, 108, 183), rgb(24, 40, 72)', 'rgb(252, 53, 76), rgb(10, 191, 188)', 'rgb(65, 77, 11), rgb(114, 122, 23)', 'rgb(228, 58, 21), rgb(230, 82, 69)', 'rgb(192, 72, 72), rgb(72, 0, 72)', 'rgb(95, 44, 130), rgb(73, 160, 157)', 'rgb(236, 111, 102), rgb(243, 161, 131)', 'rgb(116, 116, 191), rgb(52, 138, 199)', 'rgb(236, 233, 230), rgb(255, 255, 255)', 'rgb(218, 226, 248), rgb(214, 164, 164)', 'rgb(237, 66, 100), rgb(255, 237, 188)', 'rgb(220, 36, 36), rgb(74, 86, 157)', 'rgb(36, 198, 220), rgb(81, 74, 157)', 'rgb(40, 48, 72), rgb(133, 147, 152)', 'rgb(61, 126, 170), rgb(255, 228, 122)', 'rgb(28, 216, 210), rgb(147, 237, 199)', 'rgb(35, 37, 38), rgb(65, 67, 69)', 'rgb(117, 127, 154), rgb(215, 221, 232)', 'rgb(92, 37, 141), rgb(67, 137, 162)', 'rgb(19, 78, 94), rgb(113, 178, 128)', 'rgb(43, 192, 228), rgb(234, 236, 198)', 'rgb(8, 80, 120), rgb(133, 216, 206)', 'rgb(71, 118, 230), rgb(142, 84, 233)', 'rgb(97, 67, 133), rgb(81, 99, 149)', 'rgb(31, 28, 44), rgb(146, 141, 171)', 'rgb(22, 34, 42), rgb(58, 96, 115)', 'rgb(255, 128, 8), rgb(255, 200, 55)', 'rgb(29, 151, 108), rgb(147, 249, 185)', 'rgb(235, 51, 73), rgb(244, 92, 67)', 'rgb(221, 94, 137), rgb(247, 187, 151)', 'rgb(76, 184, 196), rgb(60, 211, 173)', 'rgb(31, 162, 255), rgb(18, 216, 250), rgb(166, 255, 203)', 'rgb(29, 43, 100), rgb(248, 205, 218)', 'rgb(255, 81, 47), rgb(240, 152, 25)', 'rgb(26, 41, 128), rgb(38, 208, 206)', 'rgb(170, 7, 107), rgb(97, 4, 95)', 'rgb(255, 81, 47), rgb(221, 36, 118)', 'rgb(240, 152, 25), rgb(237, 222, 93)', 'rgb(64, 59, 74), rgb(231, 233, 187)', 'rgb(229, 93, 135), rgb(95, 195, 228)', 'rgb(0, 57, 115), rgb(229, 229, 190)', 'rgb(204, 149, 192), rgb(219, 212, 180), rgb(122, 161, 210)', 'rgb(60, 165, 92), rgb(181, 172, 73)', 'rgb(52, 143, 80), rgb(86, 180, 211)', 'rgb(218, 34, 255), rgb(151, 51, 238)', 'rgb(2, 170, 176), rgb(0, 205, 172)', 'rgb(237, 229, 116), rgb(225, 245, 196)', 'rgb(211, 16, 39), rgb(234, 56, 77)', 'rgb(22, 160, 133), rgb(244, 208, 63)', 'rgb(96, 56, 19), rgb(178, 159, 148)', 'rgb(229, 45, 39), rgb(179, 18, 23)', 'rgb(255, 110, 127), rgb(191, 233, 255)', 'rgb(119, 161, 211), rgb(121, 203, 202), rgb(230, 132, 174)', 'rgb(49, 71, 85), rgb(38, 160, 218)', 'rgb(43, 88, 118), rgb(78, 67, 118)', 'rgb(230, 92, 0), rgb(249, 212, 35)', 'rgb(33, 147, 176), rgb(109, 213, 237)', 'rgb(204, 43, 94), rgb(117, 58, 136)', 'rgb(236, 0, 140), rgb(252, 103, 103)', 'rgb(20, 136, 204), rgb(43, 50, 178)', 'rgb(0, 70, 127), rgb(165, 204, 130)', 'rgb(7, 101, 133), rgb(255, 255, 255)', 'rgb(187, 210, 197), rgb(83, 105, 118)', 'rgb(151, 150, 240), rgb(251, 199, 212)', 'rgb(183, 152, 145), rgb(148, 113, 107)', 'rgb(187, 210, 197), rgb(83, 105, 118), rgb(41, 46, 73)', 'rgb(83, 105, 118), rgb(41, 46, 73)', 'rgb(172, 182, 229), rgb(134, 253, 232)', 'rgb(255, 224, 0), rgb(121, 159, 12)', 'rgb(0, 65, 106), rgb(228, 229, 230)', 'rgb(255, 226, 89), rgb(255, 167, 81)', 'rgb(121, 159, 12), rgb(172, 187, 120)', 'rgb(84, 51, 255), rgb(32, 189, 255), rgb(165, 254, 203)', 'rgb(0, 82, 212), rgb(67, 100, 247), rgb(111, 177, 252)', 'rgb(51, 77, 80), rgb(203, 202, 165)', 'rgb(0, 65, 106), rgb(121, 159, 12), rgb(255, 224, 0)', 'rgb(247, 248, 248), rgb(172, 187, 120)', 'rgb(255, 224, 0), rgb(121, 159, 12)', 'rgb(0, 65, 106), rgb(228, 229, 230))']
    return arrBGC[generateRandomIntegerNumber(0, arrBGC.length - 1)]
}

Circle.prototype.generateRandomTranslateX = function () {
    return [generateRandomIntegerNumber(-5, 0), generateRandomIntegerNumber(0, 5)]
}

Circle.prototype.generateRandomTranslateY = function () {
    return [generateRandomIntegerNumber(-5, 0), generateRandomIntegerNumber(0, 5)]
}

Circle.prototype.generateRandomScale = function () {
    return [generateRandomIntegerNumber(95, 100) / 100, generateRandomIntegerNumber(105, 110) / 100]
}

Circle.prototype.generateCircleBase = function () {
    const numDepth = this.generateRandomDepth()
    const numSideLength = this.generateRandomRadius() / numDepth
    const numRadius = numSideLength / 2
    const strBGC = this.generateRandomBGC()
    const arrOpacity = this.generateRandomOpacity(numDepth)
    const arrBlur = this.generateRandomBlur(numDepth)
    // const arrTranslateX = this.generateRandomTranslateX()
    // const arrTranslateY = this.generateRandomTranslateY()
    const arrScaleX = this.generateRandomScale()
    const arrScaleY = this.generateRandomScale()
    const numTmp = generateRandomIntegerNumber(5, 10)
    // confirm count is odd
    const numAnimateCount = numTmp % 2 === 0 ? numTmp : numTmp + 1
    const numAnimateDuration = generateRandomIntegerNumber(5, 10)
    return {
        numSideLength,
        numRadius,
        strBGC,
        arrOpacity,
        arrBlur,
        // arrTranslateX,
        // arrTranslateY,
        arrScaleX,
        arrScaleY,
        numAnimateCount,
        numAnimateDuration
    }
}

Circle.prototype.generateStyle = function (strId) {
    const {numSideLength, numRadius, strBGC, arrOpacity, arrBlur, arrTranslateX, arrTranslateY, arrScaleX, arrScaleY, numAnimateCount, numAnimateDuration} = this.generateCircleBase()
    return `#circle-${strId} {width:${numSideLength}px; height:${numSideLength}px; background: linear-gradient(to right, ${strBGC});border-radius: ${numRadius}px; left: ${generateRandomIntegerNumber(10, 900) / 10}%; top: ${generateRandomIntegerNumber(10, 900) / 10}%; filter: blur(${arrBlur[0]}px);transform: scale3d(${arrScaleX[0]}, ${arrScaleY[0]}, 1); animation: ${numAnimateDuration}s linear alternate ${numAnimateCount};} @keyframes ${strId}{0%{transform: scale3d(${arrScaleX[0]}, ${arrScaleY[0]}, 1);opacity: ${arrOpacity[0]};filter: blur(${arrBlur[0]}px);}100%{transform: scale3d(${arrScaleX[1]}, ${arrScaleY[1]}, 1);opacity: ${arrOpacity[1]};filter: blur(${arrBlur[1]}px);}}`
}

Circle.prototype.initCircleV2 = function (strId) {
    const domDiv = document.createElement('div')
    const strStyle = this.generateStyle(strId)
    const domStyle = document.createElement('style')
    domDiv.id = `circle-${strId}`
    domDiv.className = 'circle'
    domDiv.style.opacity = "0"

    domStyle.id = `circle-style-${strId}`
    domStyle.type = 'text/css'
    domStyle.innerHTML = strStyle
    return {domDiv, domStyle}
}

Circle.prototype.generateRandomMilSec = function () {
    return generateRandomIntegerNumber(0.1 * 100, 0.1 * 1000)
}

Circle.prototype.initCircleStyle = function (strId) {
    const strStyle = this.generateStyle(strId)
    const domCircle = document.getElementById(`circle-${strId}`)
    const domStyle = document.getElementById(`circle-style-${strId}`)
    domCircle.style.animationName = ""
    domCircle.style.opacity = "0"
    domStyle.innerText = strStyle
}

Circle.prototype.wakeCircle = function (strId) {
    this.objAppConfig.objObjectStatus[strId] = 1
    const domCircle = document.getElementById(`circle-${strId}`)
    const domStyle = document.getElementById(`circle-style-${strId}`)
    const strSheetOpacity = domStyle.sheet.cssRules[1][0].style.opacity
    const circleEaseIn = setInterval(() => {
        domCircle.style.opacity = (parseFloat(domCircle.style.opacity) + 0.01).toFixed(2)
        if (domCircle.style.opacity > 1) console.log("wake" + strId, domCircle.style.opacity, strSheetOpacity, circleEaseIn)
        if (domCircle.style.opacity >= strSheetOpacity) {
            domCircle.style.animationName = strId
            this.setSleepCircleFunc(strId, domStyle.sheet.cssRules[0].style.animationIterationCount * domStyle.sheet.cssRules[0].style.animationDuration.substring(0, domStyle.sheet.cssRules[0].style.animationDuration.length - 1) * 1000 + 3000)
            clearInterval(circleEaseIn)
        }
    }, this.generateRandomMilSec())
}

Circle.prototype.sleepCircle = function (strId) {
    const domCircle = document.getElementById(`circle-${strId}`)
    const circleEaseOut = setInterval(() => {
        domCircle.style.opacity = (parseFloat(domCircle.style.opacity) - 0.01).toFixed(2)
        if (domCircle.style.opacity <= 0) {
            this.initCircleStyle(strId)
            this.objAppConfig.objObjectStatus[strId] = 0
            clearInterval(circleEaseOut)
        }
    }, this.generateRandomMilSec())
}

Circle.prototype.setSleepCircleFunc = function (strId, numCircleDestroyInterval) {
    const circleSleepTimeOut = setTimeout(() => {
        clearTimeout(circleSleepTimeOut)
        this.sleepCircle(strId)
    }, numCircleDestroyInterval)
}

Circle.prototype.funcCheck = function () {
    const numSleepingObjectCount = this.objAppConfig.numMaxObjectCount - this.objAppConfig.numWakingObjectCount
    if (numSleepingObjectCount === 0) return
    let numCounts = Math.floor(Math.random().toFixed(2) * numSleepingObjectCount)
    for (const strIdKey in this.objAppConfig.objObjectStatus) {
        if (this.objAppConfig.objObjectStatus[strIdKey] === 1) continue
        this.wakeCircle(strIdKey)
        numCounts -= 1
        if (numCounts === 0) break
    }
    this.objAppConfig.numWakingObjectCount += numCounts
}

Circle.prototype.startWatcher = function () {
    setInterval(() => {
        this.funcCheck()
    }, this.objAppConfig.numNextCheckInterval)
}

Circle.prototype.runAnimateByKeyframesV2 = function (isTest = false) {
    const domFragment = document.createDocumentFragment()
    for (let i = 0; i < this.objAppConfig.numMaxObjectCount; i++) {
        let strId
        while (true) {
            strId = this.generateId()
            if (!(strId in this.objAppConfig.objObjectStatus)) {
                this.objAppConfig.objObjectStatus[strId] = 0
                break
            }
        }
        const {domDiv, domStyle} = this.initCircleV2(strId)
        domFragment.appendChild(domDiv)
        domFragment.appendChild(domStyle)
    }
    this.domContainer.appendChild(domFragment)
    if (isTest) return this.wakeCircle(Object.keys(this.objAppConfig.objObjectStatus)[0])
    this.funcCheck()
    this.startWatcher()
}

Circle.prototype.generateCircleAnimateByClass = function () {
}
