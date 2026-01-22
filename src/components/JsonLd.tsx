import { ScriptProps } from 'next/script';

interface JsonLdProps extends ScriptProps {
  id?: string;
}

/**
 * JSON-LD Component for rendering structured data
 * https://nextjs.org/docs/app/api-reference/components/script
 */
export default function JsonLd({ id, ...props }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }}
    />
  );
}
