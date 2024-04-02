
// Converting objects to text
export const extractText = (content, contentType = 'general') => {
    if (!content || (typeof content === 'object' && !content._ && !content.sup && !content.sub)) {
      switch (contentType) {
        case 'abstract':
          return content;
        default:
          return 'Content not available.';
      }
    } else if (typeof content === 'object') {
      //Handles cases where the content is an object, 
      return [content._, content.sup, content.sub].filter(Boolean).join(' ');
    }
    // Return the content directly if string and not empty
    return content;
  };