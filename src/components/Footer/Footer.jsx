import { Heart, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container py-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <span>Developed with</span>
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                        <span>by</span>
                        <a 
                            href="https://codeforces.com/profile/Skull6393" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors font-medium inline-flex items-center gap-1"
                        >
                            Pankaj Ahuja
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Made for competitive programmers, by competitive programmers</span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                        <span>Powered by </span>
                        <a 
                            href="https://codeforces.com/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                        >
                            Codeforces API
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
