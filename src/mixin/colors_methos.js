export const color_mixin = {
	methods: {
		getMortaliteLevel(level) {
			if(level>=15) return "purple"
			if(level>=10) return "red"
			if(level>=5) return "orange"
			if(level>0) return "green"
			return "black"
		},
		getCodeLetterColor(letter) {
			if(letter==="A") return "red"
			if(letter==="B") return "orange"
			if(letter==="C") return "green"
			if(letter==="D") return "blue"
			if(letter==="E") return "purple"
			return "black"
		}
	}
}