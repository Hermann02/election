export default class Formatter {
  static currency(value, devise = 'cfa') {
    return new Intl.NumberFormat('de-DE', {style: 'currency', currency: devise}).format(value)
  }

  static number(value) {
    return new Intl.NumberFormat('en-IN', {minimumIntegerDigits: 2}).format(value)
  }

  static date(value) {
    return new Date(value).toLocaleDateString("fr-FR", {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}

