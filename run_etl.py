#!/usr/bin/env python3
"""ETL Pipeline Runner"""
import logging
import sys
from pathlib import Path
from datetime import datetime

# Setup logging
log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
logging.basicConfig(
    level=logging.INFO,
    format=log_format,
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(
            Path(__file__).parent / 'logs' / f'etl_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log',
            encoding='utf-8'
        )
    ]
)

logger = logging.getLogger(__name__)

# Import and run pipeline
from etl import run_pipeline


def main():
    """Main entry point"""
    logger.info("ETL Pipeline Runner")
    logger.info(f"Working directory: {Path.cwd()}")
    
    # Ensure logs directory exists
    logs_dir = Path(__file__).parent / 'logs'
    logs_dir.mkdir(exist_ok=True)
    
    success = run_pipeline()
    
    if success:
        logger.info("Pipeline execution completed successfully")
        sys.exit(0)
    else:
        logger.error("Pipeline execution failed")
        sys.exit(1)


if __name__ == '__main__':
    main()
