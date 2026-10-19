window.view = {
	totalDisks: 0,
	steps: [],
	stepIndex: 0,
	disks: ['disk1', 'disk2', 'disk3', 'disk4', 'disk5'],
	position: ['position1', 'position2', 'position3', 'position4', 'position5'],
	codeLines: 14,
	getInput: function () {
		var value = document.getElementById('input').value.trim()
		var input = Number(value)
		if (value === '')
			alert('Enter number of disks first !')
		else if (isNaN(input) === true)
			alert('Number of disks must be an integer value !')
		else if (input < 1 || input > 5 || input % 1 !== 0)
			alert('Only integral value (Greater than equal to 1 and less than equal to 5) is accepted !')
		else {
			this.disableElement('btnOk')
			this.enableElement('btnStart')
			this.disableElement('input')
			this.changeClass('btnOk', 'buttonDisable okButton')
			this.changeClass('btnStart', 'button startButton')
			this.totalDisks = input
			this.steps = this.buildSteps(input)
			this.stepIndex = 0
			this.renderTowers(this.initialTowers(input))
		}
	},
	initialTowers: function (n) {
		var towers = { 1: [], 2: [], 3: [] }
		// disk1 is the largest, so it sits at the bottom of tower 1
		for (var disk = 1; disk <= n; disk++)
			towers[1].push(disk)
		return towers
	},
	copyTowers: function (towers) {
		return { 1: towers[1].slice(), 2: towers[2].slice(), 3: towers[3].slice() }
	},
	// Runs the same recursion as the displayed C code and records every line it executes
	buildSteps: function (n) {
		var steps = []
		var towers = this.initialTowers(n)
		var record = function (line, frame, output) {
			steps.push({ line: line, frame: frame, towers: view.copyTowers(towers), output: output || '' })
		}
		var move = function (S, D) {
			towers[D].push(towers[S].pop())
			return 'Move from tower ' + S + ' --> ' + D
		}
		var hanoi = function (S, D, T, n) {
			var frame = { S: S, D: D, T: T, n: n }
			record('line6', frame)
			record('line7', frame)
			if (n === 1) {
				record('line8', frame, move(S, D))
				record('line9', frame)
				return
			}
			record('line10', frame)
			hanoi(S, T, D, n - 1)
			record('line11', frame, move(S, D))
			record('line12', frame)
			hanoi(T, D, S, n - 1)
			record('line13', frame)
		}
		record('line1', null)
		record('line2', null)
		record('line3', null)
		record('line4', null)
		hanoi(1, 2, 3, n)
		record('line5', null)
		return steps
	},
	renderTowers: function (towers) {
		for (var towerId = 1; towerId <= 3; towerId++) {
			// .children skips the whitespace text nodes between the position divs
			var slots = document.getElementById(String(towerId)).children
			for (var i = 0; i < slots.length; i++) {
				slots[i].className = this.position[i]
				if (i < towers[towerId].length)
					slots[i].className += ' ' + this.disks[towers[towerId][i] - 1]
			}
		}
	},
	highlightLine: function (lineId) {
		for (var i = 1; i <= this.codeLines; i++)
			this.changeClass('line' + i, '')
		this.changeClass(lineId, 'showDivInRed')
	},
	setLocalVariables: function (frame) {
		var keys = ['S', 'D', 'T', 'n']
		for (var i = 0; i < keys.length; i++) {
			var cell = document.getElementById(keys[i].toLowerCase())
			cell.innerHTML = frame ? '&nbsp;' + '&emsp;&emsp;' + frame[keys[i]] : ''
		}
	},
	setOutput: function (text) {
		document.getElementById('output').innerHTML = text
	},
	showStep: function () {
		var step = this.steps[this.stepIndex]
		this.highlightLine(step.line)
		this.setLocalVariables(step.frame)
		this.renderTowers(step.towers)
		if (step.output !== '')
			this.setOutput(step.output)
	},
	changeClass: function (id, className) {
		document.getElementById(id).className = className
	},
	disableElement: function (buttonId) {
		document.getElementById(buttonId).disabled = true
	},
	enableElement: function (buttonId) {
		document.getElementById(buttonId).disabled = false
	},
	addClickEvent: function (id, method) {
		var element = document.getElementById(id)
		element.addEventListener('click', method, false)
	},
	showCode: function () {
		document.getElementById('code').className = 'codeLayout'
		this.disableElement('btnStart')
		this.enableElement('btnNext')
		this.changeClass('btnStart', 'buttonDisable startButton')
		this.changeClass('btnNext', 'button nextButton')
		this.setOutput('')
		this.stepIndex = 0
		this.showStep()
	},
	hideCode: function () {
		document.getElementById('code').className = 'hide'
		this.disableElement('btnNext')
		this.disableElement('btnStart')
		this.enableElement('btnOk')
		this.changeClass('btnOk', 'button okButton')
		this.changeClass('btnNext', 'buttonDisable nextButton')
		this.changeClass('btnStart', 'buttonDisable startButton')
		this.enableElement('input')
		document.getElementById('input').value = ''
	},
	proceed: function () {
		if (this.stepIndex < this.steps.length - 1) {
			this.stepIndex++
			this.showStep()
		}
		else {
			this.disableElement('btnNext')
			this.changeClass('btnNext', 'buttonDisable nextButton')
			this.setOutput('Done! ' + this.totalDisks + ' disk(s) moved from tower 1 to tower 2 in ' +
				(Math.pow(2, this.totalDisks) - 1) + ' move(s).')
		}
	},
	terminate: function () {
		this.totalDisks = 0
		this.steps = []
		this.stepIndex = 0
		this.setLocalVariables(null)
		this.setOutput('')
		for (var i = 1; i <= this.codeLines; i++)
			this.changeClass('line' + i, '')
		this.hideCode()
		this.renderTowers({ 1: [], 2: [], 3: [] })
	},
	activateEvents: function () {
		this.addClickEvent('btnOk', function () { view.getInput() })
		this.addClickEvent('btnStart', function () { view.showCode() })
		this.addClickEvent('btnNext', function () { view.proceed() })
		this.addClickEvent('btnReset', function () { view.terminate() })
	},
	init: function () {
		this.activateEvents()
	}
}
window.onload = function () { view.init() }
