import {
  Table as ShadTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'

export function Table({ headers, rows }) {
  return (
    <ShadTable>
      <TableHeader>
        <TableRow className="bg-bg-secondary">
          {headers.map((h, i) => (
            <TableHead key={i}>
              {typeof h === 'string' ? <span dangerouslySetInnerHTML={{ __html: h }} /> : h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, ri) => (
          <TableRow key={ri}>
            {row.map((cell, ci) => (
              <TableCell key={ci}>
                {typeof cell === 'string' ? <span dangerouslySetInnerHTML={{ __html: cell }} /> : cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  )
}
