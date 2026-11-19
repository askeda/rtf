import dayjs from 'dayjs'
import 'dayjs/locale/pl'

type DateFormat = 'D MMM YYYY' | 'D MMMM YYYY, HH:mm'

export const formatDate = (date: Date | string, format: DateFormat = 'D MMM YYYY'): string =>
  date === '' ? '' : dayjs(date).locale('pl').format(format)
