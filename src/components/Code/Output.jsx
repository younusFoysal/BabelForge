'use client';

import { useState } from 'react';
import { executeCode } from './api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split('\n'));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="mb-2 text-lg">Output</p>
      <button variant="outline" className="mb-4" onClick={runCode} disabled={isLoading}>
        {isLoading ? 'Running...' : 'Run Code'}
      </button>

      <div className={cn('h-[75vh] p-2 border rounded-md', isError ? 'border-red-500 text-red-400' : 'border-gray-600')}>
        {output ? output.map((line, i) => <p key={i}>{line}</p>) : <p>Click &quot;Run Code&quot; to see the output here</p>}
      </div>
    </div>
  );
};

export default Output;
