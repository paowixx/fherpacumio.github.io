import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChip = ({ label, onRemove, type = 'default' }) => {
  const getChipStyles = () => {
    switch (type) {
      case 'category':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'price':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'accessibility':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${getChipStyles()}`}>
      <span className="mr-2">{label}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="h-4 w-4 p-0 hover:bg-transparent"
      >
        <Icon name="X" size={12} />
      </Button>
    </div>
  );
};

export default FilterChip;